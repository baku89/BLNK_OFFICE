/* global process */

const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const webpack = require('webpack')
const WebpackStream = require('webpack-stream')
const BrowserSync = require('browser-sync')

const browserSync = BrowserSync.create()

let developmentMode = true
process.env.NODE_ENV = 'dev'
// process.env.CLIENT_DIR =

//==================================================
gulp.task('webpack', () => {
	let config = require('./webpack.config.js')

	if (developmentMode) {
		config.devtool = 'inline-source-map'
		config.watch = true
	} else {
		config.plugins.push(
			new webpack.optimize.UglifyJsPlugin(),
			new webpack.optimize.DedupePlugin()
		)
	}

	// config.entry =  [entry]
	// config.target = target
	// config.output.filename = entry.replace('src', 'build')

	return gulp.src('')
		.pipe($.plumber())
		.pipe(WebpackStream(config))
		.pipe(gulp.dest('.'))
    .pipe(browserSync.stream())
})

//==================================================
gulp.task('babel', () => {
	return gulp.src('src/server/**/*.js', {base: './src'})
		.pipe($.plumber())
		.pipe($.eslint({useEslintrc: true}))
		.pipe($.if(developmentMode, $.sourcemaps.init()))
		.pipe($.babel({presets: ['es2015']}))
		.pipe($.if(developmentMode, $.sourcemaps.write()))
		.pipe(gulp.dest('build'))
		.pipe(browserSync.stream())
})

//==================================================
gulp.task('jade', () => {
	return gulp.src('./src/*/*.jade')
		.pipe($.plumber())
		.pipe($.jade({pretty: developmentMode}))
		.pipe(gulp.dest('build'))
		.pipe(browserSync.stream())
})

//==================================================
gulp.task('stylus', () => {
	return gulp.src('./src/**/*.styl')
		.pipe($.plumber())
		.pipe($.stylus({use: require('nib')()}))
		.pipe($.autoprefixer())
		// .pipe($.if(!developmentMode, $.minifyCss()))
		.pipe(gulp.dest('build'))
		.pipe(browserSync.stream())

})

//==================================================
gulp.task('browser-sync', () => {
	browserSync.init({
		port: 9999,
		open: false,
		server: {
			baseDir: 'build'
		}
	})

	return gulp.src('.', {read: false})
		.pipe($.shell(['/usr/local/bin/electron ./build > /dev/null']))
})

//==================================================
gulp.task('watch', () => {
	gulp.watch('./src/**/*.styl', ['stylus'])
	gulp.watch('./src/**/*.jade', ['jade'])
	gulp.watch(['src/electron.js', 'src/server/**/*.js'], ['babel'])
})

//==================================================
gulp.task('release', () => {
	developmentMode = false
	process.env.NODE_ENV = 'production'
})

//==================================================

gulp.task('default', ['babel', 'webpack', 'jade', 'stylus', 'watch', 'browser-sync'])
gulp.task('build', ['release', 'jade', 'stylus', 'webpack'])
