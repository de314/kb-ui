import React from 'react'
import PropTypes from 'prop-types'

import StringField from '../lib/fields/StringField'
import BoolField from '../lib/fields/BoolField'
import HtmlField from '../lib/fields/HtmlField'

const FieldsDemo = ({}) => {
  return (
    <div className="FieldsDemo">
      <div>
        <StringField value="Hello, World!" label="String" />
      </div>
      <div>
        <StringField value="Hello, World!" label="A really long wrapped string label" />
      </div>
      <div>
        <BoolField value={true} label="Bool (true)" />
      </div>
      <div>
        <BoolField value={false} label="Bool (false)" />
      </div>
      <div>
        <HtmlField value="<em>This is only a test</em>" label="Html (simple)" />
      </div>
      <div>
        <HtmlField
          value={`
            <div style='border-left: 2px solid #CCC; border-radius: 5px; padding-left: 15px;'>
              <h4>HTML Demo:</h4>
              <hr />
              <div>
                <i>This demo is a little more <span style='color: blue'>complex</span>.</i>
              </div>
            </div>
          `}
          label="HTML (complex)"
        />
      </div>
    </div>
  );
}

export default FieldsDemo
