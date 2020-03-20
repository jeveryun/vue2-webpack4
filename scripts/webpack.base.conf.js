const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { resolve, generateDllReferences, generateAddAssests } = require('./utils')

const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: {
    app: ['./src/index.js']
  },
  output: {
    publicPath: '/',
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[hash:8].js',
    path: resolve('dist')
  },
  resolve: {
    extensions: ['.vue', '.js'],
    alias: {
      '@': resolve('./src')
    },
    modules: [resolve('./node_modules')]
  },
  performance: {
    hints: false // 配置如何展示性能提示
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // exclude: [resolve('node_modules')],
        include: [
          resolve('src')
        ],
        options: {
          cacheDirectory: true // 默认目录 node_modules/.cache/babel-loader
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          prettify: false, // 在开发环境下，不使用 prettier 格式化编译后的模板渲染代码
          cacheDirectory: resolve('node_modules/.cache/vue-loader'),
          cacheIdentifier: 'vue'
        }
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'imgs/',
              limit: 10240
            }
          }
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          isDev ? 'vue-style-loader' : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'postcss-loader',
          {
            loader: 'stylus-loader',
            options: {
              preferPathResolver: 'webpack'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [isDev ? 'vue-style-loader' : {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../',
          }
        }, 'css-loader']
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: resolve('./public/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }),
    ...generateAddAssests(),
    ...generateDllReferences()
  ]
}