var gulp = require('gulp'),
	sass = require('gulp-sass'),
	livereload = require('gulp-livereload'),
	http = require('http'),
    st = require('st'),
	minifyCss = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename');

gulp.task('sass', function () {
	gulp.src('css/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('css'))
		.pipe(livereload());
});

gulp.task('compress', function () {
	return gulp.src('js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('minify-css', ['sass'], function () {
	return gulp.src('css/*.css')
		.pipe(minifyCss({compatibility: 'ie8'}))
    	.pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
	livereload.listen();
	gulp.watch('css/*.scss', ['sass']);
	gulp.watch('*.html', function(event) {
		livereload.changed(event.path);
	});
});

gulp.task('default', ['watch'], function () {
	http.createServer(
		st({ path: __dirname, cache: false })
	).listen(8080);
});

gulp.task('prod', ['compress', 'minify-css']);