import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import ValueField from './ValueField'

const defaultValueStyle = (value) => ({
  color: value ? 'green' : 'red',
  fontWeight: 'bold'
})

const BoolField = ({ value, model, options }) => {
  const { useDefaultStyles = true } = options;
  return (
    <ValueField valueType="bool" options={options}>
      <span className="bool-value" style={ useDefaultStyles ? defaultValueStyle(value) : {} }>
        {value + ''}
      </span>
    </ValueField>
  );
}

BoolField.propTypes = {
  value: PropTypes.bool.isRequired,
  model: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
}

export default BoolField
