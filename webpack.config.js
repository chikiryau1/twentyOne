const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV,

    entry: './src/index.js',

    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'public')
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })
    ],

    devtool: 'inline-source-map',

    devServer: {
        contentBase: path.resolve(__dirname, 'public')
    },

    module: {
        rules: [
            // {
            //     test: /\.(js)$/,
            //     exclude: /node_modules/,
            //     use: {
            //         loader: "babel-loader"
            //     }
            // },
            {
                test: /\.html$/,
                use: [
                  {
                    loader: "html-loader"
                  }
                ]
              }   
        ]
    }
}