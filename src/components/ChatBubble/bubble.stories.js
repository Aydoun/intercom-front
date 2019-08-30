import React from 'react';
import { storiesOf } from '@storybook/react';
import faker from 'faker';
import { format } from 'date-fns'
import Bubble from '.';

const stories = storiesOf('Bubble', module);

const messages = new Array(10).fill(0).map(_ => ({
  right: Math.random() > 0.5,
  text: faker.lorem.sentence(),
  time: format(faker.date.recent(), "HH:mm"),
}))

stories
  .add('default', () => <Bubble
    text={faker.lorem.sentence()}
    time="11:32 PM"
    tt={messages}
  />)
  .add('random conversation', () => messages.map((item, index) => <Bubble key={index} {...item} />))
  
