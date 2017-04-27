import React from 'react';
import PropTypes from 'prop-types';
import kb from '../lib/kb-ui';
import { withState, compose } from 'recompose';

import FormDemo from './FormDemo';

const fields = [
  kb.field('id').readOnly(true).defaultValue('asdf-1234-qwerty-567890'),
  kb.field('name'),
  kb.field('email'),
  kb.field('suspened', 'bool'),
  kb.field('profile', 'embeddedObject').fields([
    kb.field('bio'),
    kb.field('website.url'),
    kb.field('website.text')
  ])
];

const fieldsDef = `const fields = [
  kb.field('id').readOnly(true).defaultValue('asdf-1234-qwerty-567890'),
  kb.field('name'),
  kb.field('email'),
  kb.field('suspened', 'bool')
];`;

const model = {
  email: 'user@test.com',
  profile: {
    bio: '<p>Hello, World!</p>',
    website: {
      url: 'https://github.com/de44',
      text: 'de44 on Github'
    }
  }
};

const EmbeddedObjectFormDemo = () => {
  return (
    <div className="SimpleUserFormDemo">
      <FormDemo fields={fields} fieldsDef={fieldsDef} model={model} />
    </div>
  );
};


export default EmbeddedObjectFormDemo;
