import React from 'react';
import { storiesOf } from '@storybook/react';
import { Icon, Avatar } from 'antd';
import faker from 'faker';
import Card from './';

const stories = storiesOf('Card', module);

const imagesrc = faker.image.avatar();
const name = faker.name.firstName() + ' ' + faker.name.lastName();
const word = faker.random.word();
const randomText = faker.company.companyName();

stories
  .add('default', () => <Card
    text={word}
  />)
  .add('With graphic', () => <Card
    text={name}
    icon={<Avatar src={imagesrc} />}
  />)
  .add('with Icon', () => <Card
    text={word}
    icon={<Icon type="clock-circle" />}
  />)
  .add('with Extra', () => <Card
    text={randomText}
    icon={<Icon type="edit" />}
    extra={<Icon type="delete" style={{ color: 'crimson' }} />}
  />)
