import React from 'react'
import kb from '../src/kb-ui'

import ViewDemo from './ViewDemo';

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
    <div className="SimpleUserDemo">
      <ViewDemo model={model} view={view} viewDef={viewDef} />
    </div>
  );
}

export default SimpleUserViewDemo
