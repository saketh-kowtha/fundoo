var path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env, options) => {
    console.log(`Webpack Bundling in production Mode`)
    return {
        entry: './index.js',
            output: {
            path: path.resolve(__dirname, 'prod' ),
                filename: 'index_bundle.js'
        },
        optimization: {
            minimizer: [new TerserJSPlugin({
                terserOptions: {
                    compress: {
                        pure_funcs: [
                            'console.log',
                            'console.info',
                            'console.debug',
                            'console.warn',
                            'alert'
                        ]
                    }
                }
            }), new OptimizeCSSAssetsPlugin({}), new UglifyJsPlugin({
                sourceMap: true,
                uglifyOptions: {
                    warnings: false,
                    parse: {},
                    compress: {
                        drop_console: true
                    },
                    mangle: true, 
                    output: null,
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_fnames: false,
                    extractComments: 'all',
                },
            })],
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
                            plugins: ["@babel/plugin-transform-arrow-functions", "@babel/plugin-proposal-class-properties"]
                        }
                    }
                }
            ]
        },
        //Prod
        performance: {
            hints: false,
            maxEntrypointSize: 512000,
            maxAssetSize: 512000
        },
        ///
        devServer: {
            historyApiFallback: true
        },
        mode: "production",
        devtool: 'source-map', // Prod
        plugins: [
            new HtmlWebpackPlugin({
                template: './index.html'
            }),
        ]
    }
}