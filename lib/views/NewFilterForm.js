import React from 'react';
import PropTypes from 'prop-types';
import { withState, withHandlers, compose } from 'recompose';

const NewFilterForm = ({ model, setModel, onAdd }) => {
  function updateOp(e) {
    model.op = e.target.value;
    setModel(model);
  }
  function updateValue(e) {
    model.value = e.target.value;
    setModel(model);
  }
  return (
    <div className="NewFilterForm">
      <div className="op-row">
        <select className="form-control" onChange={updateOp} value={model.op}>
          <option value="=">Exact Match</option>
          {/* <option value="^">Start With</option>
          <option value="$">Ends With</option> */}
          <option value="contains">Contains</option>
          <option value="<">Less Than</option>
          <option value="<=">Less Than or Equal</option>
          <option value=">">Greater Than</option>
          <option value=">=">Greater Than or Equal</option>
        </select>
      </div>
      <div className="value-row">
        <input className="form-control" type="text" onChange={updateValue} value={model.value}/>
      </div>
      <button onClick={onAdd}>Add</button>
    </div>
  );
};

NewFilterForm.propTypes = {
  model: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired
};

export default compose(
  withState('model', 'setModel', { op: '=', value: '' }),
  withHandlers({
    onAdd: props => () => {
      const { field: { options }, model, setModel, onAddFilter } = props,
          { op, value } = model,
          filter = {
            path: options.path,
            op,
            value,
            label: `${options.label} ${op} "${value}"`
          };
      onAddFilter(filter);
      model.op = '=';
      model.value = '';
      setModel(model);
    }
  })
)(NewFilterForm);
