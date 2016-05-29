var gulp = require('gulp'),
  sass = require('gulp-sass'),
  cleanCss = require('gulp-clean-css'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename');

gulp.task('sass', function () {
  gulp.src('css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'))
})

gulp.task('compress', function () {
  return gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
})

gulp.task('minify-css', ['sass'], function () {
  return gulp.src('css/*.css')
    .pipe(cleanCss({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist'))
})

gulp.task('prod', ['compress', 'minify-css'])
