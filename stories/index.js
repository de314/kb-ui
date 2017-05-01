import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';

import '../src/styles/default.scss';

import Welcome from './Welcome';

import AllFieldsDemo from './fields/AllFieldsDemo';
import SimpleUserFieldsDemo from './fields/SimpleUserFieldsDemo';
import CustomFieldDemo from './fields/CustomFieldDemo';
import CustomThumbnailFieldDemo from './fields/CustomThumbnailFieldDemo'

import UserDatagridDemo from './UserDatagridDemo';
import SimpleUserViewDemo from './SimpleUserViewDemo';
import SuppliedSimpleUserViewDemo from './SuppliedSimpleUserViewDemo'

import SimpleUserFormDemo from './SimpleUserFormDemo';
import EmbeddedObjectFormDemo from './EmbeddedObjectFormDemo';
import EmbeddedListFormDemo from './EmbeddedListFormDemo';
import SuppliedSimpleUserFormDemo from './SuppliedSimpleUserFormDemo';

import CollectionDemo from './CollectionDemo';

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
  ))
  .add('custom avatar field', () => (
    <CustomFieldDemo />
  ))
  .add('custom thumbnail field', () => (
    <CustomThumbnailFieldDemo />
  ));

storiesOf('Views', module)
  .add('simple user details view', () => (
    <SimpleUserViewDemo />
  ))
  .add('simple user details view (supplied)', () => (
    <SuppliedSimpleUserViewDemo />
  ))
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
  ))
  .add('supplied form', () => (
    <SuppliedSimpleUserFormDemo />
  ));

storiesOf('Collections')
  .add('simple user collection', () => (
    <CollectionDemo />
  ));
