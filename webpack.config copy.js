const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs')

let featureName = 'h5'
let page = null
process.argv.some(function (arg) {
  console.log(arg)
  let arr = arg.match(/\-\-env=([a-zA-Z0-9\-_,]+)/)
  if (arr) {
    let config = arr[1].split(',')

    featureName = config[0]
    if (config[1]) {
      page = config[1]
    }
  }
})

module.exports = {
  entry: path.join(__dirname, 'src/' + featureName + '/pages/' + page + '.js'),
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    filename: featureName + '/[name].js'
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
    modules: ["node_modules"],
    alias: {
      vue: 'vue/dist/vue.min.js',
      store: __dirname + '/src/store',
      components: path.resolve(__dirname + '/src/components/'),
      '@': path.resolve('src')
    }
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new VueLoaderPlugin(),
  ],
  devServer: {
    // historyApiFallback: {
    //   index: '/dist/h5/index.html'
    // },
    host: '0.0.0.0',
    disableHostCheck: true
  }
}