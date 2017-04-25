import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Welcome from './Welcome';

import FieldsDemo from './FieldsDemo'
import SimpleUserFieldsDemo from './SimpleUserFieldsDemo'

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));

storiesOf('View Fields', module)
  .add('all fields', () => (
    <FieldsDemo />
  ))
  .add('simple user fields', () => (
    <SimpleUserFieldsDemo />
  ));
