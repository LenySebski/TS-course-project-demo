import { ProjectStatus, Project } from "../models/project-model";

type Listener<T> = (items: T[]) => void;

//project state menegment class

class State<T> {
	protected listeners: Listener<T>[] = [];

	constructor() {
		console.log();
	}

	addListener(listenerFn: Listener<T>) {
		this.listeners.push(listenerFn);
	}
}

export class ProjectState extends State<Project> {
	private projects: Project[] = [];
	private static instance: ProjectState;

	private constructor() {
		super();
	}
	static getInstance() {
		if (!this.instance) {
			this.instance = new ProjectState();
		}
		return this.instance;
	}

	addListener(listenerFn: Listener<Project>) {
		this.listeners.push(listenerFn);
	}
	addProject(title: string, description: string, numOfPeople: number) {
		const newProject = new Project(
			Math.random().toString(),
			title,
			description,
			numOfPeople,
			ProjectStatus.Active
		);
		this.projects.push(newProject);
		for (const listenerFn of this.listeners) {
			listenerFn(this.projects.slice());
		}
	}

	moveProject(id: string, targetStatus: ProjectStatus) {
		const project = this.projects.find((project) => project.id === id);
		if (project && project.status != targetStatus) {
			project.status = targetStatus;
			this.updateListeners();
		}
	}

	deleteProject(id: string) {
		const project = this.projects.find((project) => project.id === id);
		if (project) {
			this.projects = this.projects.filter(
				(project) => project.id !== id
			);
			this.updateListeners();
		}
	}

	private updateListeners() {
		for (const listenerFn of this.listeners) {
			listenerFn(this.projects.slice());
		}
	}
}

export const projectState = ProjectState.getInstance();
