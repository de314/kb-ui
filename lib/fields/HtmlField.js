import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import ValueField from './ValueField'

const defaultValueStyle = {
  display: 'inline-block'
}

const HtmlField = ({ value, model, options }) => {
  const { useDefaultStyles = true } = options;
  return (

    <ValueField valueType="html" options={options}>
      <span className="html-value" style={ useDefaultStyles ? defaultValueStyle : {} } dangerouslySetInnerHTML={{ __html: value }} />
    </ValueField>
  );
}

HtmlField.propTypes = {
  value: PropTypes.string.isRequired,
  model: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
}

export default HtmlField
