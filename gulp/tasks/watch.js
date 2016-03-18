var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var config = require('../config');

gulp.task('watch', function () {
  browserSync.init(config.browser);

  gulp.watch(config.sass.all, ['sass']);
  gulp.watch(config.html.all, ['html']);
  gulp.watch(config.images.src, ['images']);
  gulp.watch(config.js.src, ['javascripts']);
});
