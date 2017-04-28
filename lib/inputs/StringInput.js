import React from 'react';
import PropTypes from 'prop-types';

import ValueInput from './ValueInput';

const defaultValueStyle = { };

function defaultRender(value, onChange) {
  return (<input className="form-control" type="text" value={value} onChange={e => onChange(e.target.value)} />);
}

const StringInput = ({ value, model, options, onChange }) => {
  const { render = defaultRender } = options;
  return (
    <ValueInput valueType="string" options={options}>
      <span className="string-input">
        {render(value, onChange, model, options)}
      </span>
    </ValueInput>
  );
};

StringInput.propTypes = {
  model: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired,
  value: PropTypes.node
};

export default StringInput;
