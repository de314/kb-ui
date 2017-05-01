import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const ValueField = ({ valueType, options = {}, children }) => {
  const { label, className = `ValueField ${_.capitalize(valueType)}Field`, raw = false } = options;
  return (
    <span className={className}>
      { raw || _.isUndefined(label) ? '' : (<span className={`field-label ${valueType}-label`}>{label}</span>) }
      <span className="field-value">{ children }</span>
    </span>
  );
};

ValueField.propTypes = {
  options: PropTypes.object,
  valueType: PropTypes.string.isRequired
};

export default ValueField;
