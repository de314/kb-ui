import React from 'react';
import PropTypes from 'prop-types';
import kb from '../src/kb-ui';
import { withState, compose } from 'recompose';

import FormDemo from './FormDemo';

function getUser(id, name, email, suspended) {
  return {
    id,
    name,
    email,
    suspended,
    profile: {
      bio: '<h4 style="border-bottom: 1px dashed red;"><span style="color: blue">Hello, </span><span style="color: green">World!</span></h4>',
      website: {
        url: "https://github.com/de44",
        text: "de44 (github)"
      }
    }
  }
}

const supplier = kb.suppliers.mem([
  getUser('a', 'David P', 'david@bc.com', false),
  getUser('c', 'David H', 'davidh@bc.com', false),
  getUser('d', 'David E', 'davide@bc.com', false),
  getUser('e', 'John Mo', 'johnmo@bc.com', true),
  getUser('f', 'John Mc', 'johnmc@bc.com', true)
])

const form = kb.form()
.supplier(supplier)
.fields([
  kb.field('id').readOnly(true).defaultValue('asdf-1234-qwerty-567890'),
  kb.field('name'),
  kb.field('email'),
  kb.field('suspened', 'bool')
]);

const formDef = `function getUser(id, name, email, suspended) {
  return {
    id,
    name,
    email,
    suspended,
    profile: {
      bio: '<h4 style="border-bottom: 1px dashed red;"><span style="color: blue">Hello, </span><span style="color: green">World!</span></h4>',
      website: {
        url: "https://github.com/de44",
        text: "de44 (github)"
      }
    }
  }
}

const supplier = kb.suppliers.mem([
  getUser('a', 'David P', 'david@bc.com', false),
  getUser('c', 'David H', 'davidh@bc.com', false),
  getUser('d', 'David E', 'davide@bc.com', false),
  getUser('e', 'John Mo', 'johnmo@bc.com', false),
  getUser('f', 'John Mc', 'johnmc@bc.com', false)
])

const form = kb.form()
.supplier(supplier)
.fields([
  kb.field('id').readOnly(true).defaultValue('asdf-1234-qwerty-567890'),
  kb.field('name'),
  kb.field('email'),
  kb.field('suspened', 'bool')
]);`;

const SuppliedSimpleUserFormDemo = ({ id, setId }) => {
  return (
    <div className="SimpleUserFormDemo">
      <div>
        Set Id: <input type="text" onChange={e=>setId(e.target.value)} value={id} />
      </div>
      <hr/>
      <FormDemo form={form} formDef={formDef} model={id} />
    </div>
  );
};


export default compose(
  withState('id', 'setId', 'a')
)(SuppliedSimpleUserFormDemo);
