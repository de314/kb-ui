import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const defaultContainerStyle = {
  display: 'inline-block',
  marginTop: '20px',
  paddingLeft: '10px'
};

const defaultLabelStyle = {
  display: 'inline-block',
  width: '150px',
  fontWeight: 'bold',
  textDecoration: 'italics',
  marginRight: '10px'
};

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
