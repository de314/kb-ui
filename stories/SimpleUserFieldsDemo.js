import React from 'react'
import kb from '../lib/kb-ui'

import FieldsDemo from './FieldsDemo'

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

const fields = [
  kb.field('id'),
  kb.field('name'),
  kb.field('suspended', 'bool'),
  kb.field('profile.bio', 'html').label('Bio'),
  kb.field('profile.website').render((val) => (
    <span>
      Click Here: <a href={val.url} target="_blank">{val.text}</a>
    </span>
  ))
];

const fieldsDef = `const fields = [
  kb.field('id'),
  kb.field('name'),
  kb.field('suspended', 'bool'),
  kb.field('profile.bio', 'html').label('Bio'),
  kb.field('profile.website').render((val) => (
    <span>
      Click Here: <a href={val.url} target="_blank">{val.text}</a>
    </span>
  ))
];`

const SimpleUserFieldsDemo = ({}) => {
  return (
    <div className="ListViewDemo">
      <FieldsDemo fields={fields} model={model} fieldsDef={fieldsDef} />
    </div>
  );
}

export default SimpleUserFieldsDemo
