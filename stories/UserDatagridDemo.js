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
  getUser(4, 'My Friend', 'friend@test.com', false)
]);

const fields = [
  kb.field('id').label('User ID').raw(true),
  kb.field('name').raw(true),
  kb.field('email').raw(true),
  kb.field('suspended').render(val => (
    <span>{ val ? (<span style={{ color: 'red', fontWeight: 'bold' }}>Suspended</span>) : '' }</span>
  )).raw(true)
];

const options = {};

const UserDatagridDemo = ({}) => {
  return (
    <div className="DatagridDemo">
      <Datagrid fields={fields} supplier={supplier} options={options} />
    </div>
  );
}

export default UserDatagridDemo
