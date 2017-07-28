
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV || "production";

module.exports = {
	entry: "./src/init.jsx",
	output: {
		path : __dirname + "/dist",
		publicPath: "",
		filename: "bundle.js"
	},
	watch: NODE_ENV == 'dev',
	watchOptions: {
		aggregateTimeout: 100
	},
	devtool: NODE_ENV == 'dev' ? 'source-map' : false,
	plugins: [

		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV)
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './index.pug')
		}),
		/*new CopyWebpackPlugin([
			{
				from:'./src/img',
				to:'./img'
			}
		])*/
	],
	module: {
		rules: [
			{
				test: /\.pug$/,
				use: [
					{
						loader: "pug-loader",
						options: {
							pretty: NODE_ENV == 'dev'
						}
					}

				]
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options:{
							presets: ['es2015', 'react']
						}
					}

				],
			},
		]
	}
};