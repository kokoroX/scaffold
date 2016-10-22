var gulp = require('gulp');

gulp.task('build', ['clean'], function () {
  gulp.start('postcss', 'html', 'uglify', 'imagemin');
});
