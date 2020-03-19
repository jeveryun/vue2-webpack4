const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'dist.js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [{
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
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].css'
    })
  ]
}