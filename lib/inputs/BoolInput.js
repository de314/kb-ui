import React from 'react';
import PropTypes from 'prop-types';

import ValueInput from './ValueInput';

const defaultValueStyle = (value) => ({
  color: value ? 'green' : 'red',
  fontWeight: 'bold'
});

const BoolInput = ({ value = false, onChange, options }) => {
  const { useDefaultStyles = true } = options;
  return (
    <ValueInput valueType="bool" options={options}>
      <span className="bool-value" style={ useDefaultStyles ? defaultValueStyle(value) : {} }>
        <input type="checkbox" checked={value} onChange={e => onChange(e.target.checked)} />
      </span>
    </ValueInput>
  );
};

BoolInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired,
  value: PropTypes.bool
};

export default BoolInput;
