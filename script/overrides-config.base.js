const webpack = require('webpack');
const poststylus = require('poststylus');
const autoprefixer = require('autoprefixer');
const path = require('path');


module.exports.stylusLoaderOptionsPlugin = new webpack.LoaderOptionsPlugin({
    options: {
        stylus: {
            use: [
                poststylus([
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                        browsers: [
                          '>1%',
                          'last 4 versions',
                          'Firefox ESR',
                          'not ie < 9', // React doesn't support IE8 anyway
                        ],
                        flexbox: 'no-2009',
                      })
                ])
            ]
        }
    }
});

module.exports.rootPath = resolve('src');

function resolve(dir) {
    return path.join(__dirname, '..',dir)
}