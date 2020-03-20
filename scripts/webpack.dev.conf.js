const webpack = require('webpack')

module.exports = {
  mode: 'development',
  devtool: 'cheep-module-eval-source-map',
  devServer: {
    open: true,
    compress: true,
    port: 8001,
    hot: true,
    hotOnly: false,
    historyApiFallback: true,
    clientLogLevel: 'info',
    stats: 'minimal',
    inline: true,
    proxy: {
      '/api': {
        target: 'http://10.20.23.209:8089/',
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },
  optimization: {
    usedExports: true,
    runtimeChunk: {
      name: 'runtime'
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
}