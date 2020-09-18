const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const autoprefixer = require('autoprefixer')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const ROOT_PATH = path.resolve(__dirname, '../')
const ENV_TYPE = process.env.ENV_TYPE
const isTest = ENV_TYPE === 'fat'
const commonConfig = require('./webpack.common')

module.exports = merge(commonConfig, {
  output: {
    path: path.resolve(ROOT_PATH, 'dist/'),
    filename: 'static/js/[name]_[hash:12].js',
    chunkFilename: 'static/js/[name]_[chunkhash].js',
    publicPath: '/'
  },
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          warnings: false,
          compress: {
            comparisons: false,
            drop_console: isTest ? false : true,
          },
          parse: {},
          mangle: true,
          output: {
            comments: false,
            ascii_only: true,
          },
        },
        parallel: 4,
        cache: true,
        sourceMap: false,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    nodeEnv: 'production',
    sideEffects: true,
    concatenateModules: true,
    splitChunks: {
      chunks: 'all',
      minSize: 40000,
      minChunks: 3,
      maxAsyncRequests: 5,
      maxInitialRequests: 4,
      name: false,
      cacheGroups: {
        antd: {
          test: /[\\/]node_modules[\\/]antd[\\/]/,
          name: 'antd',
          chunks: 'all',
          enforce: true,
        },
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          minChunks: 3,
          chunks: 'all',
        },
        main: {
          chunks: 'all',
          minChunks: 2,
          name: 'app',
          test: /[\\/]src[\\/]/,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
    runtimeChunk: true,
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: [path.resolve(ROOT_PATH, 'node_modules')],
        use: [
          'thread-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {   // 最新的并不支持 modules 配置改为单独对象了
                localIdentName: '[name]__[local]--[hash:base64:8]'
              },
              importLoaders: 1, // 该方式可以让 @import 引入的 css 文件再次执行一遍 css 打包 loader
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer({ add: true, remove: true }) // add prefixer for different browers,remove redundant prefixer
              ]
            }
          },
          {
            loader: 'less-loader',
          }
        ]
      },
      {
        test: /\.css$/,
        include: [path.resolve(ROOT_PATH, 'node_modules')],
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/css/flm_[name].css',
      chunkFilename: 'static/css/flm_[id]_[hash:8].css', // use contenthash *
      ignoreOrder: true, // 移除警告
    }),
    new HtmlwebpackPlugin({
      filename: 'index.html',
      template: path.resolve(ROOT_PATH, './template/index.html'),
      inject: true,
      minify: {
        // https://github.com/kangax/html-minifier#options-quick-reference
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'auto'
    }),
    // gizp 压缩
    new CompressionPlugin({
      test: /\.(js|css)$/i,
      algorithm: 'gzip'
    }),
    // 排除的处理项
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  stats: 'minimal',
  target: 'web',
  performance: {
    hints: "warning", // enum
    maxAssetSize: 200000, // int (in bytes),
    maxEntrypointSize: 400000, // int (in bytes)
    assetFilter: function (assetFilename) {
      // Function predicate that provides asset filenames
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },
})
