module.exports = function(config) {
  return {
    // 入口设置
    entry: config.entry,
    // 出口设置
    output: config.output,
    // source map 支持
    devtool: config.sourceMap ? '#source-mao' : '',
    // 加载器
    module: {
      loaders: [{
        test: /\.scss$/,
        loader: 'style!css!sass'
      },{
        test: /\.css$/,
        loader: 'style!css'
      },{
        test: /\.html$/,
        loader: 'html'
      }]
    },
    modulesDirectories: ['node_modules'],
    extensions: ['.js']
  };
};
