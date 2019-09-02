import { configure, addDecorator } from '@storybook/react';
import './global.css';

const stories = () => {
  const req = require.context('../src/', true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
};

addDecorator(story => story())
configure(stories, module);