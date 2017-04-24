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

const defaultValueStyle = { }

const StringField = ({ value, model, options }) => {
  const { label, className, useDefaultStyles = true, render = (val) => val } = options;
  return (
    <span className={_.defaultTo(className, 'StringField')}>
      {_.isUndefined(label) ? '' : (<span className="string-label" style={ useDefaultStyles ? defaultLabelStyle : {} }>{label}</span>) }
      <span className="string-value" style={ useDefaultStyles ? defaultValueStyle : {} }>{render(value, model, options)}</span>
    </span>
  );
}

StringField.propTypes = {
  value: PropTypes.string.isRequired,
  model: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
}

export default StringField
