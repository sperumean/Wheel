const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  entry: {
    main: './src/index.js',
    // Define other entry points if necessary
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },  module: {
    rules: [

      {
        test: /\.html$/,
        use: ['html-loader'], // Add this loader for HTML files
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },

      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body', // Injects the script at the end of the <body> tag
    }),
    // Add another HtmlWebpackPlugin instance for contact.html
    new HtmlWebpackPlugin({
      template: './src/contact.html', // Source of your contact.html file
      filename: 'contact.html', // The name of the output file
      inject: 'body', // This is optional if you don't need to inject any scripts into contact.html
    }),
    new MiniCssExtractPlugin({
      filename: 'output.css', // Output CSS file names
    }),
  ],
  mode: 'production',
};
