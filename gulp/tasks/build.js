var gulp = require('gulp');

gulp.task('build', ['clean'], function () {
  gulp.start('sass', 'html', 'uglify', 'imagemin');
});
