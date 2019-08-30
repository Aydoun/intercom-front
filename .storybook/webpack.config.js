const path = require('path');

module.exports = async ({ config, mode }) => {
  const srcPath = path.resolve(__dirname, '../src');
  config.resolve = {
    modules: ['node_modules', srcPath],
  };

  return config;
};
