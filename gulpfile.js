const { src, dest, series, watch } = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const autoprefixer  = require('gulp-autoprefixer');

function styles() {
	return src('app/sass/**/*.sass')
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(dest('app/css'));
}

function cssLibs() {
	return src('app/css/libs.css')
		.pipe(cssnano())
		.pipe(rename({suffix : '.min'}))
		.pipe(dest('app/css/'));
}

function scripts() {
	return src([
		'app/libs/jquery/dist/jquery.min.js'
	])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(dest('app/js/'));
}

function clean() {
	return del(['build/*/'], {force: true});
}

function startWatch() {
	watch('app/sass/**/*', styles);
	watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
}

function buildTask() {
	return src([
		'app/css/default.css',
		'app/css/libs.min.css',
		'app/fonts/**/*',
		'app/img/**/*',
		'app/js/**/*',
		'app/*.html'
	], {base: 'app'})
		.pipe(dest('build'));
}

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.startWatch = startWatch;
exports.build = series(clean, styles, cssLibs, scripts, buildTask);

exports.default = series(styles, cssLibs, scripts, startWatch);