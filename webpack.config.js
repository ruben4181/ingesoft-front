const {VueLoaderPlugin} = require('vue-loader');
const HTMLWebpackPlugin=require('html-webpack-plugin');
module.exports={
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader'
                }
            },
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test: /\.css$/,  
                include: /node_modules/,  
                loaders: ['style-loader', 'css-loader'],
           }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HTMLWebpackPlugin({
            template: './src/index.html'
        })
    ]
};