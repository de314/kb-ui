import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash';
import kb from '../../src/kb-ui'

import KbField from '../../src/fields/KbField';

import FieldsDemo from './FieldsDemo'

KbField._plugin('robohash', {
  field: ({model, options}) => {
    return (
      <img src={`https://robohash.org/${_.at(model, options.hashField)}?size=64x64`} style={{ width: "64px", height: "64px" }}/>
    )
  }
});

KbField._setter('hashField');

const model = {
  id: 0,
  email: 'david@test.com'
};

const fields = [
  kb.field('', 'robohash').raw(true).hashField('email')
];

const fieldsDef = `KbField._plugin('robohash', {
  field: (val, model, options) => {
    return (
      <img src={'https://robohash.org/' + _.at(model, options.hashField)} + '?size=64x64'} style={{ width: "64px", height: "64px" }}/>
    )
  }
});

KbField._setter('hashField');

const model = {
  id: 0,
  email: 'david@test.com'
};

const fields = [
  kb.field('', 'robohash')
      .label('My Custom Field')
      .raw(true)
      .hashField('email')
];`

const codeStyle = {
  width: "600px",
  padding: "10px",
  backgroundColor: "#CCC",
  overflow: "scroll",
}

const CustomFieldDemo = ({ }) => {
  return (
    <div className="FieldsDemo">
      <FieldsDemo fields={fields} model={model} fieldsDef={fieldsDef} />
    </div>
  );
}

export default CustomFieldDemo
