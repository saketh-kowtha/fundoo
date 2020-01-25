var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, options) => {
    console.log(`Webpack Bundling in Dev Mode`)
    return {
        entry: './index.js',
            output: {
            path: path.resolve(__dirname,'dev'),
                filename: 'index_bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.(js)$/,
                    use: 'babel-loader'
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.s[ac]ss$/i,                    
                    use: ['style-loader', 'css-loader', 'sass-loader']
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                        }
                    ]
                },
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', "@babel/preset-react"],
                            plugins: ["@babel/plugin-transform-arrow-functions", "@babel/plugin-proposal-class-properties" , "@babel/plugin-transform-runtime"]
                        }
                    }
                }
            ]
        },
        devServer: {
            historyApiFallback: true
        },
        mode: "development",
        plugins: [
            new HtmlWebpackPlugin({
                template: './index.html'
            })
        ]
    }
}