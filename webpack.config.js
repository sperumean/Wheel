const path = require('path');

module.exports = {
  entry: './src/index.js', // The entry point of your application
  output: {
    filename: 'bundle.js', // The output bundle
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply this rule to JavaScript files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // Use the preset-env preset for Babel
          },
        },
      },
    ],
  },
  mode: 'development', // Use development mode (or change to 'production' for production builds)
};
