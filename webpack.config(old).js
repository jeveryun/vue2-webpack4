const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'dist.js',
    path: path.resolve(__dirname, './dist')
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['.vue', '.js'],
    modules: [path.resolve(__dirname, './node_modules')]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          prettify: false,
          cacheDirectory: path.resolve('node_modules/.cache/vue-loader'),
          cacheIdentifiner: 'vue'
        }
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              esModule: false, // 最新版本这里要设置为false
              name: '[name].[ext]',
              outputPath: 'imgs/',
              limit: 10240
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.styl(us)?$/,
        use: [
          // 'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              public: '../',
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2 // 在css-loader 前执行的loader数量
            }
          },
          'postcss-loader',
          {
            loader: 'stylus-loader',
            options: {
              preferPathResolver: 'webpack' // 优先使用webpack进行路径解析，找不到再用stylus-loader 的路径解析
            }
          }
        ]
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
      template: path.resolve(__dirname, 'public/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].css'
    })
  ],
  watch: true,
  devServer: {
    open: true,
    compress: true, // 是否启用 gzip 压缩，默认 `true`
    port: 9002,
    hot: true, // 是否启用热模块替换，也就是修改代码后不需你手动刷新浏览器，浏览器加载差异内容自动替换，默认 true
    hotOnly: true, // 热模块替换功能失败时是否刷新浏览器，默认 `true`
    historyApiFallback: true, // 任意的 404 响应都被替代为 index.html
    clientLogLevel: 'none', // `string: 'none' | 'info' | 'error' | 'warning'`日志打印等级，
    // 默认 `info` ，一般设置为`none` ，否则控制台会有很多干扰信息（热加载的一些信息）
    stats: 'minimal',
    inline: true,
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:8081',
        pathRewrite: {
          '/api': ''
        }
      }
    }
  }
}