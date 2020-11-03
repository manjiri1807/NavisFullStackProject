// libs
const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

const DIST_ROOT = 'dev';
const APP_NAME = process.env.APP_NAME;

module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  target: 'web',
  entry: {
    "app": [
      "@babel/polyfill",
      path.resolve(__dirname, "./app/entry.js")
    ],
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /web-server/],
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-proposal-optional-chaining",
              "@babel/plugin-syntax-dynamic-import",
              "@babel/plugin-transform-runtime",
              "@babel/proposal-object-rest-spread",
            ],
            presets: ["@babel/preset-env", "@babel/preset-react"],
            cacheDirectory: true,
          }
        }
      },
      {
        test: /\.(css|sass|scss)$/,
        exclude: [/node_modules/, /web-server/],
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        exclude: [/node_modules/, /web-server/],
        use: [
          {
            loader: 'file-loader',
            options: {
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        exclude: [/node_modules/, /web-server/],
        loader: 'svg-inline-loader',
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              query: {
                name: 'fonts/[name].[ext]',
              }
            },
          },
        ],
      },
      {
        test: /\.(jpg|svg|png|gif)$/,
        include: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              query: {
                name: 'images/[name].[ext]',
              }
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
      '@app': path.resolve(__dirname, './app/src'),
    },
    extensions: [ "*", ".js", ".jsx" ]
  },
  output: {
    filename: `[name].bundle.js`,
    chunkFilename: `[name].[chunkhash:16].bundle.js`,
    path: path.resolve(__dirname, `./web-server/dist/${DIST_ROOT}`),
  },
  optimization: {
    minimize: false,
  },
};
