// gulp 自动化构建工具
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var webpack = require('webpack');

// browserify 浏览器自刷新工具
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// 路径配置
var src = './dev/',
  dist = './dist/',
  homepage = 'index.html';
// config file
var config = {
  src: src,
  dest: dist,
  webServer: {
    server: dist,
    index: homepage,
    port: 3000,
    logLevel: 'debug',
    logPrefix: 'kokoro',
    open: true,
    files: [dist + '**.js', dist + '**.html', dist + '**.css']
  },
  watchJS: src + '**/*.js',
  watchCSS: src + '**/*.css',
  watchSASS: src + 'sass/**.scss',
  watchHTML: src + '**/*.html',
  watchSource: [
    src + 'fonts/**',
    src + 'images/**'
  ]
};

var webpackConfig = require('./webpack.config')({
  entry: src + 'javascripts/index.main.js',
  output: {
    path: dist + 'javascripts/',
    filename: '[name].bundle.js',
  },
  sourceMap: true,
});

// html编译
gulp.task('html', function() {
  gulp.src(config.watchHTML)
    .pipe(gulp.dest(dist));
});

//静态文件编译
gulp.task('source', function() {
  gulp.src(config.watchSource)
    .pipe(gulp.dest(dist));
});

// css编译
gulp.task('css', function() {
  gulp.src(config.watchCSS)
    .pipe(gulp.dest(dist));
});

// sass编译
gulp.task('sass', function() {
  gulp.src(config.watchSASS)
    .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest(dist + 'css'));
});

// webpack 启动
gulp.task('webpack', function() {
  webpack(webpackConfig, function(err, stats) {
    if(err) {
      handleErrors();
    }
  });
});
//error prompt
function handleErrors() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: '编译错误',
        message: '<%= error.message %>'
    }).apply(this, args);
    this.emit('end');
};

// web服务 Server + watching scss/html files
gulp.task('web-server', function() {
    browserSync.init(config.webServer);
});

// 任务集合
gulp.task('watch', ['html', 'source', 'css', 'sass', 'webpack', 'web-server'], function() {
  gulp.watch(config.watchJS, ['webpack']);
  gulp.watch(config.watchCSS, ['css']);
  gulp.watch(config.watchSASS, ['sass']);
  gulp.watch(config.watchHTML, ['html']);
  gulp.watch(config.watchSource, ['source']);
  gulp.watch(config.watchHTML).on('change', reload);
});

// gulp默认任务
gulp.task('default', ['watch']);
