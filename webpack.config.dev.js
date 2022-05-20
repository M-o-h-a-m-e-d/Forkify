const commonConfig = require('./webpack.config.common');
const { merge } = require('webpack-merge');
const path = require('path');
module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'source-map',
  output: {
    filename: 'script.[contenthash].js',
    assetModuleFilename: 'assets/[name][ext]',
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][hash][ext]',
        },
      },
    ],
  },

  devServer: {
    static: './dist',
    open: true,
    server: 'http',
    port: 3000,
    hot: true,
    watchFiles: ['./src/template.html', './src/img'],
    // liveReload: true,
  },
});
