import React from 'react';
import PropTypes from 'prop-types';
import kb from '../src/kb-ui';
import { withState, lifecycle, compose } from 'recompose';

const userSupplier = kb.suppliers.mem([
  { id: 'a', name: 'David', email: 'david@goog.com', suspended: true }
]);

const actions = {
  editUser: () => {},
  viewUser: () => {}
}

const suspendedViewField = kb.field('suspended')
  .render((isSuspended) => (
    <span>
      {!isSuspended ? '' : <span style={{ fontWeight: "bold", color: "red"}}>Suspended</span>}
    </span>
  ));

const userCollection = kb.collection(userSupplier);

userCollection.list(
  kb.view().fields([
    kb.field('id'),
    kb.field('name'),
    kb.field('email')
      .render((email) => (
        <a href={`mailto:${email}`}>{email}</a>
      )),
    suspendedViewField,
    kb.field('actions')
      .render((val, model) => (
        <span>
          <button onClick={e=>actions.viewUser(model.id)}>View</button>
          <button onClick={e=>actions.editUser(model.id)}>Edit</button>
        </span>
      ))
  ])
);

userCollection.edit(
  kb.form().fields([
    kb.field('id').readOnly(true),
    kb.field('name'),
    kb.field('email'),
    kb.field('suspended', 'bool')
  ])
)

userCollection.create(
  kb.form().fields([
    kb.field('id').readOnly(true).defaultValue(() => (Math.random() + '').substring(2)),
    kb.field('name'),
    kb.field('email'),
    kb.field('suspended', 'hidden').defaultValue(false)
  ])
);

userCollection.details(
  kb.view().fields([
    kb.field('avatar').raw(true).render((val, model) => (
      <div>
        <img src={`https://robohash.org/${model.email}?size=200x200`} style={{ width: '200px', height: '200px' }}/>
      </div>
    )),
    kb.field('name'),
    kb.field('email'),
    kb.field('id').render((val) => (<em>{val}</em>)),
    suspendedViewField
  ])
)

const CollectionDemo = ({
  editId, setEditId, showCreateForm, setShowCreateForm,
  viewId, setViewId
}) => {
  return (
    <div className="CollectionDemo">
      <div>
        <h1>List Users</h1>
        <div>
          <button onClick={e=>setShowCreateForm(true)}>Create User</button>
        </div>
        <div>
          {userCollection.renderList()}
        </div>
      </div>

      <div>
        <h1>View User</h1>
        { viewId === '' ? (<em>Select a user from the grid.</em>) : (
          <div>
            {userCollection.renderDetails(viewId)}
          </div>
        ) }
      </div>

      <div>
        <h1>Edit User</h1>
        { editId === '' ? (<em>Select a user from the grid.</em>) : (
          <div>
            {userCollection.renderEdit(editId, () => setEditId(''))}
          </div>
        ) }
      </div>

      <div>
        <h1>Create New User</h1>
        { !showCreateForm ? (<em>Click button above grid to begin.</em>) : (
          <div>
            {userCollection.renderCreate(() => setShowCreateForm(false))}
          </div>
        ) }
      </div>
    </div>
  );
};

CollectionDemo.propTypes = {};

export default compose(
  withState('editId', 'setEditId', ''),
  withState('viewId', 'setViewId', ''),
  withState('showCreateForm', 'setShowCreateForm', false),
  lifecycle({
    componentWillMount() {
      actions.editUser = this.props.setEditId;
      actions.viewUser = this.props.setViewId;
    }
  })
)(CollectionDemo);
