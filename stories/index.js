import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Welcome from './Welcome';

import AllFieldsDemo from './AllFieldsDemo';
import SimpleUserFieldsDemo from './SimpleUserFieldsDemo';

import UserDatagridDemo from './UserDatagridDemo';

import SimpleUserFormDemo from './SimpleUserFormDemo';
import EmbeddedObjectFormDemo from './EmbeddedObjectFormDemo';
import EmbeddedListFormDemo from './EmbeddedListFormDemo';

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

storiesOf('Forms', module)
  .add('simple user form', () => (
    <SimpleUserFormDemo />
  ))
  .add('embedded object form', () => (
    <EmbeddedObjectFormDemo />
  ))
  .add('embedded list form', () => (
    <EmbeddedListFormDemo />
  ));
