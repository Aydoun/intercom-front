import React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import Breadcrumb from './';

const routes = [{ url: 'google.com', name: 'google' }, { url: 'yahoo.com', name: 'yahoo' }];

const stories = storiesOf('Breadcrumb', module);

stories
  .add('default', () => <BrowserRouter><Breadcrumb /></BrowserRouter>)
  .add('With Routes', () => <BrowserRouter><Breadcrumb routes={routes} /></BrowserRouter>)
  