const {description} = require('./package.json');

module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = description;
                return args;
            })
    }
}