var gulp = require('gulp');
var sass = require('gulp-sass');
var reload = require('browser-sync').create().reload;
var config = require('../config').sass;
var handleErrors = require('../util/handleErrors');

gulp.task('sass', function () {
  return gulp.src(config.src)
    .pipe(sass(config.settings))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest))
    .pipe(reload({stream: true}));
});
