const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.ts',
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname),
  },
  devServer: {
    historyApiFallback: true,
    static: path.resolve(__dirname),
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
  plugins: [new HTMLWebpackPlugin()],
};
