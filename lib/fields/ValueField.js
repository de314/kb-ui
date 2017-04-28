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

const ValueField = ({ valueType, options = {}, children }) => {
  const { label, className = _.capitalize(valueType) + 'Field', useDefaultStyles = true, raw = false } = options;
  return (
    <span className={className} style={ useDefaultStyles ? defaultContainerStyle : {} }>
      { raw || _.isUndefined(label) ? '' : (<span className={`${valueType}-label`} style={ useDefaultStyles ? defaultLabelStyle : {} }>{label}</span>) }
      <span style={{ display: 'inline-block' }}>{ children }</span>
    </span>
  );
};

ValueField.propTypes = {
  options: PropTypes.object,
  valueType: PropTypes.string.isRequired
};

export default ValueField;
