const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, 'src/h5/pages/demo.js'),
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  resolve: {
    extensions: [
      '.vue', '.js'
    ],
    module: {
      vue: 'vue/dist/vue.min.js',
      components: path.resolveF(__dirname, '/src/components'),
      '@': path.resolve('src')
    }
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new VueLoaderPlugin(),
  ],
  devServer: {
    historyApiFallback: {
      index: '/dist/h5/index.html'
    },
    host: '0.0.0.0',
    disableHostCheck: true
  }
}