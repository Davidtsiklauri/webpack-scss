const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

const pages = fs.readdirSync('./src/views')

const htmlPageNames = pages.filter((page) => page.endsWith('.html') );

const htmlPagePlugins = htmlPageNames.map(name =>  
    new HtmlWebpackPlugin({
        template: `./src/views/${name}`,
        filename: `${name}`, 
    })
);


module.exports = {
    devtool: 'source-map',
    mode: 'development',
    entry: {
        index: './src/index.ts',
    },
    module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.(s(a|c)ss)$/,
            use: ['style-loader','css-loader', 'sass-loader']
         },
         {
            test: /\.html$/i,
            loader: "html-loader",
         },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
          title: 'Output Management',
          title: 'Development',
        }),
    ].concat(htmlPagePlugins),
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 4200,
    },
    devtool: 'inline-source-map',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    watchOptions: {
        ignored: '**/node_modules',
      },
  };