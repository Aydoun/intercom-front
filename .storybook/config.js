import { configure, addDecorator, setAddon } from '@storybook/react';
// import addWithDoc from 'storybook-addon-props';
// import '../node_modules/antd/dist/antd.min.css';

// setAddon(addWithDoc);

const stories = () => {
  const req = require.context('../src/', true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
};

addDecorator(story => story())
configure(stories, module);