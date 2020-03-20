const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const glob = require('glob')
const AddAssestHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

const _memorize = fn => {
  const cache = {}
  return (...args) => {
    const _args = JSON.stringify(args)
    return cache[_args] || (cache[_args] = fn.call(this, ...args))
  }
}

const _resolve = (...args) => {
  return path.join(__dirname, '..', ...args)
}

const resolve = _memorize(_resolve)

const generateWebpackConfig = production => {
  if (production) {
    process.env.NODE_ENV = 'production'
    return merge(require('./webpack.prod.conf'), require('./webpack.base.conf'))
  } else {
    process.env.NODE_ENV = 'development'
    return merge(require('./webpack.dev.conf'), require('./webpack.base.conf'))
  }
}

const webpackStatsPrint = function (stats) {
  console.log(
    stats
      .toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      })
      .replace(/\n.*?static.*?(?=\n)/g, '') + '\n'
  );
}


/**
 * @description 引用和 dll 建立映射关系
 */
const generateDllReferences = function () {
  const manifests = glob.sync(`${resolve('dll')}/*.json`)

  return manifests.map(file => {
    return new webpack.DllReferencePlugin({
      manifest: file
    })
  })
}

/**
 * @description 把 dll 加入到 html 文件
 */
const generateAddAssests = function () {
  const dlls = glob.sync(`${resolve('dll')}/*.js`)

  return dlls.map(file => {
    return new AddAssestHtmlWebpackPlugin({
      filepath: file,
      outputPath: '/dll',
      publicPath: '/dll'
    })
  })
}

module.exports = {
  resolve,
  generateWebpackConfig,
  webpackStatsPrint,
  generateDllReferences,
  generateAddAssests
}