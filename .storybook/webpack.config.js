const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  const srcPath = path.resolve(__dirname, '../src');

  config.resolve = {
    modules: ['node_modules', srcPath],
  };

  // fixes for css
  config.module.rules.push({
    test: /\.css$/,
    loaders: ['style-loader', 'css-loader'],
  });
  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
  });

  // Return the altered config
  return config;
};

// module.exports = (storybookBaseConfig, configType) => {
//   // fixes for module-resolver
//   storybookBaseConfig.resolve.alias = {
//     actions: path.resolve(__dirname, '../src/actions'),
//     api: path.resolve(__dirname, '../src/api'),
//     application: path.resolve(__dirname, '../src'),
//     components: path.resolve(__dirname, '../src/components'),
//     config: path.resolve(__dirname, '../src/config'),
//     containers: path.resolve(__dirname, '../src/containers'),
//     helpers: path.resolve(__dirname, '../src/helpers'),
//     hoc: path.resolve(__dirname, '../src/hoc'),
//     i18n: path.resolve(__dirname, '../src/i18n'),
//     images: path.resolve(__dirname, '../src/images'),
//     middlewares: path.resolve(__dirname, '../src/middlewares'),
//     oidc: path.resolve(__dirname, '../src/oidc'),
//     reducers: path.resolve(__dirname, '../src/reducers'),
//     selectors: path.resolve(__dirname, '../src/selectors'),
//     styles: path.resolve(__dirname, '../src/styles'),
//     utils: path.resolve(__dirname, '../src/utils'),
//   };

//   // fixes for css
//   storybookBaseConfig.module.rules.push({
//     test: /\.css$/,
//     loaders: ['style-loader', 'css-loader'],
//     include: path.resolve(__dirname, '../'),
//   });

//   return storybookBaseConfig;
// };