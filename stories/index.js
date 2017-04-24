import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Welcome from './Welcome';

import FieldsDemo from './FieldsDemo'
import ListViewDemo from './ListViewDemo'

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));

storiesOf('Views', module)
  .add('all fields', () => (
    <FieldsDemo />
  ))
  .add('simple user view', () => (
    <ListViewDemo />
  ));
