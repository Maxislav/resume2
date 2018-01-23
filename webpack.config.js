
const NODE_ENV = process.env.NODE_ENV || "production";
const Webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


console.log(NODE_ENV)

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
	devServer : {
    contentBase: __dirname + '/src'
	},
	plugins: [

		new Webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV),
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)

		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './index.pug')
		}),
		new CopyWebpackPlugin([
			{
				from:'./src/img',
				to:'./img'
			},
			{
				from: './src/asset/skill-history.json',
				to:'./asset'
			},
			{
				from: './src/libs',
				to:'./libs'
			}

		]),
    new Webpack.EnvironmentPlugin(['NODE_ENV'])

  ],
	resolve: {
		extensions: ['.js', '.jsx'],

	},
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
							presets: [ 'stage-1', 'react'],
							plugins: ['transform-decorators-legacy' ]
						}
					}

				],
			},
			{
				test: /\.styl$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
                        options: { importLoaders: 1, modules: true },
					},
					{
						loader: 'stylus-loader'
					}
				]
			}
		]
	}
};


if(NODE_ENV=='production'){
  //module.exports.plugins.unshift(new Version({}))
  module.exports.plugins.push(
    new UglifyJsPlugin()
  )
}
