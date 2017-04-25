import React from 'react'
import PropTypes from 'prop-types'

const defaultContainerStyle = {
  display: 'inline-block',
  marginTop: '20px',
  paddingLeft: '10px',
}

const defaultLabelStyle = {
  display: 'inline-block',
  width: '150px',
  fontWeight: 'bold',
  textDecoration: 'italics',
  marginRight: '10px',
}

const ValueField = ({ valueType, options = {}, children }) => {
  const { label, className = _.capitalize(valueType) + "Field", useDefaultStyles = true, raw = false, render = (val) => val } = options;
  return (
    <span className={className} style={ useDefaultStyles ? defaultContainerStyle : {} }>
      { raw || _.isUndefined(label) ? '' : (<span className={`${valueType}-label`} style={ useDefaultStyles ? defaultLabelStyle : {} }>{label}</span>) }
      { children }
    </span>
  );
}

ValueField.propTypes = {
  valueType: PropTypes.string.isRequired,
  options: PropTypes.object,
}
export default ValueField
