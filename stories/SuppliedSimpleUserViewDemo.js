import React from 'react'
import kb from '../src/kb-ui'
import { withState, compose } from 'recompose';

import ViewDemo from './ViewDemo';

function getUser(id, name, suspended) {
  return {
    id,
    name,
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
  getUser('a', 'David P', false),
  getUser('c', 'David H', false),
  getUser('d', 'David E', false),
  getUser('e', 'John Mo', false),
  getUser('f', 'John Mc', false)
])

const view = kb.view()
    .asDetails()
    .supplier(supplier)
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

const viewDef = `function getUser(id, name, suspended) {
  return {
    id,
    name,
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
  getUser('a', 'David P', false),
  getUser('c', 'David H', false),
  getUser('d', 'David E', false),
  getUser('e', 'John Mo', false),
  getUser('f', 'John Mc', false)
])

const view = kb.view()
    .asDetails()
    .supplier(supplier)
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

const codeStyle = {
  width: "600px",
  padding: "10px",
  backgroundColor: "#CCC",
  overflow: "scroll",
}

const SimpleUserViewDemo = ({ model, setModel }) => {
  return (
    <div className="SimpleUserDemo">
      <div>
        Set Id: <input type="text" onChange={e=>setModel(e.target.value)} value={model} />
      </div>
      <hr/>
      <ViewDemo model={model} view={view} viewDef={viewDef} />
    </div>
  );
}

export default compose(
  withState('model', 'setModel', 'a')
)(SimpleUserViewDemo)
