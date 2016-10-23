var src = './src';
var dest = './dist';

module.exports = {
  postcss: {
    all: src + '/css/**/*.css',
    src: src + '/css/*.css',
    dest: dest + '/css',
    settings: {}
  },
  html: {
    all: src + '/**/*.html',
    dest: dest
  },
  images: {
    src: src + '/assets/**',
    dest: dest + '/assets'
  },
  js: {
    src: src + '/javascripts/**.js',
    dest: dest + '/javascripts'
  },
  clean: {
    src: dest
  },
  browser: {
    server: dest
  }
}
