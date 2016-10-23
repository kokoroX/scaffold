var gulp = require('gulp');
var config = require('../config').postcss
var autoprefixer = require('gulp-autoprefixer');

//根据设置浏览器版本自动处理浏览器前缀
gulp.task('autoprefixer', function () {
  return gulp.src(config.src)
    .pipe(autoprefixer({
      browsers: ['last 2 versions'], //主流浏览器的最新两个版本
      cascade: true, //是否美化属性值 默认：true 像这样：
      //-webkit-transform: rotate(45deg);
      //        transform: rotate(45deg);
      remove:true //是否去掉不必要的前缀 默认：true
    }))
    .pipe(config.dest);
});
