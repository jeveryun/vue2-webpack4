const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { resolve } = require('./utils')

const libs = {
  _frame: ['vue', 'vue-router', 'vuex'],
  _utils: ['lodash']
}

module.exports = {
  mode: 'production',
  entry: { ...libs },
  performance: false,
  output: {
    path: resolve('dll'),
    filename: '[name].dll.js',
    library: '[name]'
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: []
    }),
    new webpack.DllPlugin({
      name: '[name]',
      path: resolve('dll', '[name].manifest.json'),
      context: resolve('')
    })
  ]
}