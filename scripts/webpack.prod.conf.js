const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const config = require('./config')
const { resolve } = require('./utils')

const webpackConfig = {
  model: 'production',
  devtool: config.production.sourceMap ? 'cheap-module-eval-source-map' : 'none',
  output: {
    filename: '[name].[thunkhash:8].js',
    chunkFilename: '[name].[contentHash:8].chunk.js'
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}

if (config.production.bundleAnalyzer) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig