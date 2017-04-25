import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import ValueField from './ValueField'

const defaultValueStyle = { }

const StringField = ({ value, model, options }) => {
  const { useDefaultStyles = true, render = (val) => val } = options;
  return (
    <ValueField valueType="string" options={options}>
      <span className="string-value" style={ useDefaultStyles ? defaultValueStyle : {} }>
        {render(value, model, options)}
      </span>
    </ValueField>
  );
}

StringField.propTypes = {
  value: PropTypes.string.isRequired,
  model: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
}

export default StringField
