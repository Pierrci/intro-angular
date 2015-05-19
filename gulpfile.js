var gulp = require('gulp'),
	sass = require('gulp-sass'),
	livereload = require('gulp-livereload'),
	http = require('http'),
    st = require('st');

gulp.task('sass', function() {
	gulp.src('css/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('css'))
		.pipe(livereload());
});

gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('css/*.scss', ['sass']);
	gulp.watch('*.html', function(event) {
		livereload.changed(event.path);
	});
});

gulp.task('default', ['watch'], function() {
	http.createServer(
		st({ path: __dirname, cache: false })
	).listen(8080);
});