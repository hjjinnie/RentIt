const path = require('path');

//publicPath allows you to put the bundle under a specific directory

module.exports = env => {
return {
    mode: process.env.NODE_ENV,
    devServer: {
        publicPath: '/build/'
    },
    entry: './client/App.jsx',
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
        {
            test: /jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['@babel/env', '@babel/react'],
            }
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
                // Creates `style` nodes from JS strings
                'style-loader',
                // Translates CSS into CommonJS
                'css-loader',
                // Compiles Sass to CSS
                'sass-loader',
              ],
          },
    
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css','.scss'],
  },
}
}