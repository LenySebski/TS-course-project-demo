const path = require("path");
const cleanPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode: "production",
	entry: ["./src/app.ts"],
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	devtool: false,
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
		],
	},
	resolve: {
		extensions: [".ts", ".js", ".css"],
	},
	plugins: [
		new cleanPlugin.CleanWebpackPlugin(),
		new HtmlWebpackPlugin({ template: "./index.html" }),
		new MiniCssExtractPlugin(),
	],
};
