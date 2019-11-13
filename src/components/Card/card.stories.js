import React from 'react';
import { storiesOf } from '@storybook/react';
import { Icon } from 'antd';
import faker from 'faker';
import Card from './';

const stories = storiesOf('Card', module);

const word = faker.random.word();
const randomText = faker.company.companyName();

stories
  .add('default', () => <Card
    text={word}
  />)
  .add('with Icon', () => <Card
    text={word}
    icon="clock-circle"
  />)
  .add('with Extra', () => <Card
    text={randomText}
    icon="edit"
    extra={<Icon type="delete" style={{ color: 'crimson' }} />}
  />)
