const path = require('path');

module.exports = function override(config, env) {
    const srcPath = path.resolve(__dirname, 'src');

    config.resolve = {
        modules: ['node_modules', srcPath],
    };
    
    return config;
};
