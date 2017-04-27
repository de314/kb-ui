import React from 'react'
import kb from '../lib/kb-ui'

import FieldsDemo from './FieldsDemo'

const view = kb.view()
    .asDetails()
    .fields([
      kb.field('id'),
      kb.field('name'),
      kb.field('suspended', 'bool'),
      kb.field('profile.bio', 'html').label('Bio'),
      kb.field('profile.website').render((val) => (
        <span>
          Click Here: <a href={val.url} target="_blank">{val.text}</a>
        </span>
      ))
    ]);

const viewDef = `const view = kb.view()
    .asDetails()
    .fields([
      kb.field('id'),
      kb.field('name'),
      kb.field('suspended', 'bool'),
      kb.field('profile.bio', 'html').label('Bio'),
      kb.field('profile.website').render((val) => (
        <span>
          Click Here: <a href={val.url} target="_blank">{val.text}</a>
        </span>
      ))
    ]);`

const model = {
  id: "asdf-123",
  name: "John Deer",
  suspended: false,
  profile: {
    bio: '<h4 style="border-bottom: 1px dashed red;"><span style="color: blue">Hello, </span><span style="color: green">World!</span></h4>',
    website: {
      url: "https://github.com/de44",
      text: "de44 (github)"
    }
  }
};

const codeStyle = {
  width: "600px",
  padding: "10px",
  backgroundColor: "#CCC",
  overflow: "scroll",
}

const SimpleUserViewDemo = ({}) => {
  return (
    <div className="ListViewDemo">
      {view._render(model)}
      <div>
        <hr />
        <h4>Fields Configurations</h4>
        <div style={codeStyle}>
          <pre>{viewDef}</pre>
        </div>
        <h4>Model</h4>
        <div style={codeStyle}>
          <pre>{JSON.stringify(model, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}

export default SimpleUserViewDemo
