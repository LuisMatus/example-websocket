// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const TerserPlugin = require('terser-webpack-plugin');

//const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: 'production', // production | development | none
	entry: __dirname+'/resources/js/bundle.js',

	resolve: {
		alias: {
			vue: 'vue/dist/vue.esm.js',
		}
	},	output: {
		filename: 'bundle.js',
		path: __dirname+'/public/js/',
		//publicPath: __dirname+'/public/js'
	},

	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			// this will apply to both plain `.js` files
			// AND `<script>` blocks in `.vue` files
			{
				test: /\.js$/,
				loader: 'babel-loader'
			},
			{
				test: /\.pug$/,
				loader: 'pug-plain-loader'
			},
			{
				test: /\.sass$/,
				use: [
					"style-loader", // creates style nodes from JS strings
					"css-loader", // translates CSS into CommonJS
					"sass-loader" // compiles Sass to CSS, using Node Sass by default
				]
			},
			{
				test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: '../fonts/'
					}
				}]
			},
			//load stylus
			{ 
				test: /\.styl(us)?$/,
				use: [
					'vue-style-loader',
					'css-loader',
					'stylus-loader'
				]
			},
			{//load lib css
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}

		]
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					output: {
						comments: false,
					},
				},
			}),
		],
	},
	plugins: [

		new VueLoaderPlugin(),
		/*new MiniCSSExtractPlugin({
			filename: "./css/estilos.css",
		})*/
	],

};


