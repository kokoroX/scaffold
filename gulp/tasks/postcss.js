var gulp = require('gulp');
var postcss = require('gulp-postcss');
var bem = require('postcss-bem');
var cssNext = require('postcss-cssnext');
var px2rem = require('postcss-px2rem');
var autoprefixer = require('autoprefixer-core');
var postcssSimpleVars = require('postcss-simple-vars');
var postcssMixins = require('postcss-mixins');
var postcssNested = require('postcss-nested');
var sourcemaps = require('gulp-sourcemaps');
// var sass = require('gulp-sass');
var reload = require('browser-sync').create().reload;
var config = require('../config').sass;
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
    }),
    autoprefixer({
      browsers: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 10']
    })
  ]
  return gulp.src([config.src])
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    // .pipe(sass(config.settings))
    // .on('error', handleErrors)
    .pipe(gulp.dest(config.dest))
    .pipe(reload({stream: true}));
});
