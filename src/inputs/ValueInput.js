import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const ValueInput = ({ valueType, options = {}, children }) => {
  const { label, className = `ValueInput ${_.capitalize(valueType)}Field`, raw = false } = options;
  return (
    <span className={className}>
      { raw || _.isUndefined(label) ? '' : (<span className={`input-label ${valueType}-label`}>{label}</span>) }
      <span className="input-value">{ children }</span>
    </span>
  );
};

ValueInput.propTypes = {
  options: PropTypes.object,
  valueType: PropTypes.string.isRequired
};

export default ValueInput;
