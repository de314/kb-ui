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

const defaultValueStyle = {
  display: 'inline-block'
}

const HtmlField = ({ value, model, options }) => {
  const { label, className, useDefaultStyles = true } = options;
  return (
    <span className={_.defaultTo(className, 'HtmlField')}>
      {_.isUndefined(label) ? '' : (<span className="html-label" style={ useDefaultStyles ? defaultLabelStyle : {} }>{label}</span>) }
      <span className="html-value" style={ useDefaultStyles ? defaultValueStyle : {} } dangerouslySetInnerHTML={{ __html: value }} />
    </span>
  );
}

HtmlField.propTypes = {
  value: PropTypes.string.isRequired,
  model: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
}

export default HtmlField
