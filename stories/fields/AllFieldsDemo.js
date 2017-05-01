import React from 'react'
import PropTypes from 'prop-types'
import kb from '../../src/kb-ui'

import FieldsDemo from './FieldsDemo'


const allModel = {
  string: "Hello, World!",
  rawString: "This is a raw string field with NO label!",
  bf: false,
  bt: true,
  html: {
    simple: "<em>This is only a test</em>",
    complex: `
      <div style='border-left: 2px solid #CCC; border-radius: 5px; padding-left: 15px;'>
        <h4>HTML Demo:</h4>
        <hr />
        <div>
          <i>This demo is a little more <span style='color: blue'>complex</span>.</i>
        </div>
      </div>
    `,
    raw: '<div style="padding: 10px;background-color: #DDD"><h1>This is a raw html snippet</h1></div>'
  }
}

const allFields = [
  kb.field('string'),
  kb.field('string').label('A really long wrapped string label'),
  kb.field('bf', 'bool').label('Bool (false)'),
  kb.field('bt', 'bool').label('Bool (true)'),
  kb.field('html.simple', 'html').label('Html (simple)'),
  kb.field('html.complex', 'html').label('Html (complex)'),
  kb.field('html.raw', 'html').raw(true),
];

const allFieldsDef = `const allFields = [
  kb.field('string'),
  kb.field('string').label('A really long wrapped string label'),
  kb.field('bf', 'bool').label('Bool (false)'),
  kb.field('bt', 'bool').label('Bool (true)'),
  kb.field('html.simple', 'html').label('Html (simple)'),
  kb.field('html.complex', 'html').label('Html (complex)'),
  kb.field('html.raw', 'html').raw(true),
];`

const codeStyle = {
  width: "600px",
  padding: "10px",
  backgroundColor: "#CCC",
  overflow: "scroll",
}

const AllFieldsDemo = ({ model = allModel, fields = allFields, fieldsDef = allFieldsDef }) => {
  return (
    <div className="FieldsDemo">
      <FieldsDemo fields={allFields} model={allModel} fieldsDef={allFieldsDef} />
    </div>
  );
}

export default AllFieldsDemo
