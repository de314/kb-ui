import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const ValueInput = ({ valueType, options = {}, children }) => {
  const { label, className = `ValueInput ${_.capitalize(valueType)}Field form-group`, raw = false } = options;
  return (
    <div className={className}>
      { raw || _.isUndefined(label) ? '' : (<label className={`input-label ${valueType}-label`}>{label}</label>) }
      <span className="input-value">{ children }</span>
    </div>
  );
};

ValueInput.propTypes = {
  options: PropTypes.object,
  valueType: PropTypes.string.isRequired
};

export default ValueInput;
