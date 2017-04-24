import React from 'react'
import field from '../lib/fields/KbField'

const kb = {
  field,
}

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
  kb.field('profile.bio', 'html').label('Profile'),
  kb.field('profile.website').render((val) => (
    <span>
      Click Here: <a href={val.url} target="_blank">{val.text}</a>
    </span>
  ))
];

console.log(fields);

const ListViewDemo = ({}) => {
  return (
    <div className="ListViewDemo">
      {fields.map((field,i) => (
        <div id={i}>
          {field._render(model)}
        </div>
      ))}
    </div>
  );
}

export default ListViewDemo
