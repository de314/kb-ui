import React from 'react'
import PropTypes from 'prop-types'

import StringField from '../lib/fields/StringField'
import BoolField from '../lib/fields/BoolField'
import HtmlField from '../lib/fields/HtmlField'

import field from '../lib/fields/KbField'

const kb = {
  field,
}

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


const FieldsDemo = ({ model = allModel, fields = allFields }) => {
  return (
    <div className="FieldsDemo">
      {fields.map((field,i) => (
        <div id={i}>
          {field._render(model)}
        </div>
      ))}
    </div>
  );
}

export default FieldsDemo
