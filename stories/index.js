import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Welcome from './Welcome';

import AllFieldsDemo from './AllFieldsDemo'
import SimpleUserFieldsDemo from './SimpleUserFieldsDemo'

import UserDatagridDemo from './UserDatagridDemo'

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));

storiesOf('Fields', module)
  .add('all fields', () => (
    <AllFieldsDemo />
  ))
  .add('simple user fields', () => (
    <SimpleUserFieldsDemo />
  ));

storiesOf('Views', module)
  .add('simple user grid', () => (
    <UserDatagridDemo />
  ));
