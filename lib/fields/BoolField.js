import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const defaultLabelStyle = {
  display: 'inline-block',
  width: '130px',
  fontWeight: 'bold',
  textDecoration: 'italics',
  marginTop: '15px',
  marginRight: '10px',
}

const defaultValueStyle = (value) => ({
  color: value ? 'green' : 'red',
  fontWeight: 'bold'
})

const BoolField = ({ value, model, options }) => {
  const { label, className, useDefaultStyles = true } = options;
  return (
    <span className={_.defaultTo(className, 'BoolField')}>
      {_.isUndefined(label) ? '' : (<span className="bool-label" style={ useDefaultStyles ? defaultLabelStyle : {} }>{label}</span>) }
      <span className="bool-value" style={ useDefaultStyles ? defaultValueStyle(value) : {} }>{value + ''}</span>
    </span>
  );
}

BoolField.propTypes = {
  value: PropTypes.string.isRequired,
  model: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
}

export default BoolField
