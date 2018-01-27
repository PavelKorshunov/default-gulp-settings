var gulp = require('gulp'),
	sass = require('gulp-sass'),
	del  = require('del');

gulp.task('sass', function(){
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
	.pipe(gulp.dest('app/css'));
});

gulp.task('watch', function(){
	gulp.watch('app/sass/**/*.sass', ['sass']);
});

gulp.task('clean', function(){
	return del.sync('build');
});

gulp.task('build', ['clean', 'sass'], function(){
	
	var buildCss = gulp.src('app/css/**/*.css')
	.pipe(gulp.dest('build/css'));

	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('build/'));
});