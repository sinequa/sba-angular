let assetFunctions = require("sass-asset-functions");
let postcssFlexboxFixes = require("postcss-flexbugs-fixes"); 
let postcssFocusWithin = require("postcss-focus-within");
let webpack = require("webpack");
let sass = require("sass");

let config = {
    module: {
        rules: [
            {
                test: /\.scss$|\.sass$/,
                use: [
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: (loader) => [
                                postcssFlexboxFixes(),
                                postcssFocusWithin()
                            ] 
                        }
                    },
                    {
                        loader: 'sass-loader', 
                        options: {
                            sassOptions: {
                                functions: assetFunctions({images_path: 'projects/pepper/src/styles', implementation: sass})
                            },
                            implementation: sass
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                "sinequa-core": {
                    test: /[\\/]node_modules[\\/]core[\\/]/,
                    enforce: true,
                    priority: 1,
                    name: "sinequa-core"
                }
            }
        }
    },
    resolve: {
        symlinks: false		   
    },
    plugins: [
        new webpack.IgnorePlugin({
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment$/
          })
    ]
};

module.exports = config;