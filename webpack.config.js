const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Import the plugin

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
      {
        test: /\.css$/, // Apply this rule to CSS files
        use: ['style-loader', 'css-loader'], // Use these loaders for CSS files
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Apply this rule to image files
        type: 'asset/resource', // Use 'asset/resource' to emit a separate file
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // Apply this rule to font files
        type: 'asset/resource', // Use 'asset/resource' to emit a separate file
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Path to your source index.html
      filename: 'index.html', // Output HTML file name
    }),
    // Add other plugins as needed
  ],
  mode: 'production', // Set to 'production' for optimized builds
};