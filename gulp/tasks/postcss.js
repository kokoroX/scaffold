var gulp = require('gulp');
var postcss = require('gulp-postcss');
var bem = require('postcss-bem');
var cssNext = require('postcss-cssnext');
var px2rem = require('postcss-px2rem');
var postcssSimpleVars = require('postcss-simple-vars');
var postcssMixins = require('postcss-mixins');
var postcssNested = require('postcss-nested');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
// var sass = require('gulp-sass');
var reload = require('browser-sync').create().reload;
var config = require('../config').postcss;
var handleErrors = require('../util/handleErrors');

gulp.task('postcss', function () {
  var processors = [
    postcssMixins,
    postcssSimpleVars,
    postcssNested,
    cssNext,
    bem({style: 'bem'}),
    px2rem({
      remUnit: 20
    })
  ]
  return gulp.src([config.src])
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'], //主流浏览器的最新两个版本
      cascade: true, //是否美化属性值 默认：true 像这样：
      //-webkit-transform: rotate(45deg);
      //        transform: rotate(45deg);
      remove:true //是否去掉不必要的前缀 默认：true
    }))
    .pipe(sourcemaps.write('.'))
    // .pipe(sass(config.settings))
    // .on('error', handleErrors)
    .pipe(gulp.dest(config.dest))
    .pipe(reload({stream: true}));
});
