import React from 'react'
import PropTypes from 'prop-types'

import kb from '../lib/kb-ui';

import Datagrid from '../lib/views/Datagrid'

function getUser(id, name, email, suspended) {
  return ({ id, name, email, suspended })
}

const supplier = kb.suppliers.mem([
  getUser(0, 'Admin User', 'admin@test.com', false),
  getUser(1, 'Test User', 'test@test.com', false),
  getUser(2, 'Bad Guy', 'banned@test.com', true),
  getUser(3, 'Just a Guy', 'guy@test.com', false),
  getUser(4, 'My Friend', 'friend@test.com', false),
  getUser(5, 'My Friend #2', 'friend2@test.com', false),
  getUser(6, 'My Friend #3', 'friend3@test.com', false)
]);

const view = kb.view().asList()
    .supplier(supplier)
    .fields([
      kb.field('id').label('User ID'),
      kb.field('name'),
      kb.field('email'),
      kb.field('suspended').render(val => (
        <span>{ val ? (<span style={{ color: 'red', fontWeight: 'bold' }}>Suspended</span>) : '' }</span>
      ))
    ]);

const viewDef = `const supplier = kb.suppliers.mem([
  getUser(0, 'Admin User', 'admin@test.com', false),
  getUser(1, 'Test User', 'test@test.com', false),
  getUser(2, 'Bad Guy', 'banned@test.com', true),
  getUser(3, 'Just a Guy', 'guy@test.com', false),
  getUser(4, 'My Friend', 'friend@test.com', false),
  getUser(5, 'My Friend #2', 'friend2@test.com', false),
  getUser(6, 'My Friend #3', 'friend3@test.com', false)
]);

const view = kb.view().asList()
    .supplier(supplier)
    .fields([
      kb.field('id').label('User ID'),
      kb.field('name'),
      kb.field('email'),
      kb.field('suspended').render(val => (
        <span>{ val ? (<span style={{ color: 'red', fontWeight: 'bold' }}>Suspended</span>) : '' }</span>
      ))
    ]);`;

const codeStyle = {
  width: "600px",
  padding: "10px",
  backgroundColor: "#CCC",
  overflow: "scroll",
}

const UserDatagridDemo = ({}) => {
  return (
    <div className="DatagridDemo">
      {view._render()}
      <hr />
      <h4>View Configuration</h4>
      <div style={codeStyle}>
        <pre>{viewDef}</pre>
      </div>
    </div>
  );
}

export default UserDatagridDemo
