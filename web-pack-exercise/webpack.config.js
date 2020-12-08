const path = require('path');
const webpack = require('webpack');

const config = (env, argv) => {
  const backendUrl =
    argv.mode === 'production'
      ? 'https://blooming-atoll-75500.herokuapp.com/api/notes'
      : 'http://localhost:3001/notes';

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js',
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'build'),
      compress: true,
      port: 3000,
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backendUrl),
      }),
    ],
  };
};
module.exports = config;
