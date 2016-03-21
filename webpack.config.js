let webpack = require('webpack');

module.exports = {
	entry: {
		'client/client': './src/client/client.js'
	},
	target: 'web',
	output: {
		filename: './build/[name].js'
	},
	resolve: {
		alias: {},
		modulesDirectories: [
			'node_modules',
			"web_modules"
		],
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel!eslint',
				exclude: /node_modules|web_modules/
			},
			{
				test: /\.jade$/,
				loader: 'jade-loader'
			},
			{
				test: /\.styl$/,
				loader: 'style!css!stylus'
			},
			{test: /\.(vert|frag|glsl)$/, loaders:['raw-loader','glslify-loader']}
		]
	},
	stylus: {
		use: [require('nib')()]
	},
	eslint: {
		configFile: './.eslintrc',
		formatter: require('eslint-friendly-formatter'),
		failOnError: true
	},
	plugins: [
		new webpack.IgnorePlugin(/vertx/),
		new webpack.ProvidePlugin({
			$: 'jquery'
		})
	]
};
