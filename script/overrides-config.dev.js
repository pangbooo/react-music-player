const baseConfig = require('./overrides-config.base');
module.exports = function(config){

    // Use your ESLint
    /*let eslintLoader = config.module.rules[0];
    eslintLoader.use[0].options.useEslintrc = true;*/
    
    let loaderList = config.module.rules[1].oneOf;

    // Define the root path alias
    let alias = config.resolve.alias;
    alias['@'] = baseConfig.rootPath;

    loaderList.splice(loaderList.length - 1, 0, {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader']
    });

    config.plugins.push(baseConfig.stylusLoaderOptionsPlugin);
}
