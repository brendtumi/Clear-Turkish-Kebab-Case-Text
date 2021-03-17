const { author, description, keywords } = require('./package.json');

module.exports = {
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = description;
      args[0].author = author;
      args[0].keywords = keywords.join(', ');
      return args;
    });
  },
};
