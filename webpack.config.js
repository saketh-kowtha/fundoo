var path = require('path');

var HtmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = {
    entry : './src/index.js',
    output : {
        path : path.resolve(__dirname , 'dist'),
        filename: 'index_bundle.js'
    },
    module : {
        rules : [
            {
                test : /\.(js)$/, 
                use:'babel-loader'
            },
            {
                test : /\.css$/, 
                use:['style-loader', 'css-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', "@babel/preset-react"]
                    }
                }
            }
        ]
    },
    mode:'development',
    plugins : [
        new HtmlWebpackPlugin ({
            template : 'src/index.html'
        })
    ]
}
