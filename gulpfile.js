var gulp    = require('gulp'),
	sass    = require('gulp-sass'),
	del     = require('del'),
	cssnano = require('gulp-cssnano'),
	rename  = require('gulp-rename')
	concat  = require('gulp-concat'),
	uglify  = require('gulp-uglify');

gulp.task('sass', function(){
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
	.pipe(gulp.dest('app/css/'));
});

gulp.task('css-libs', ['sass'], function(){
	return gulp.src('app/css/libs.css')
	.pipe(cssnano())
	.pipe(rename({suffix : '.min'}))
	.pipe(gulp.dest('app/css/'));
});

gulp.task('scripts', function(){
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js'
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js/'));
});

gulp.task('watch', ['css-libs', 'scripts'], function(){
	gulp.watch('app/sass/**/*.sass', ['sass']);
});

gulp.task('clean', function(){
	return del.sync('build');
});

gulp.task('build', ['clean', 'css-libs', 'scripts'], function(){
	
	var buildCss = gulp.src([
		'app/css/default.css',
		'app/css/libs.min.css'
	])
	.pipe(gulp.dest('build/css/'));

	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('build/fonts/'));

	var buildImg = gulp.src('app/img/**/*')
	.pipe(gulp.dest('build/img/'));

	var buildJs = gulp.src('app/js/**/*')
	.pipe(gulp.dest('build/js/'));

	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('build/'));

});