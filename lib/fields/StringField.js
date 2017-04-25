import React from 'react';
import PropTypes from 'prop-types';

import ValueField from './ValueField';

const defaultValueStyle = { };

const StringField = ({ value, model, options }) => {
  const { useDefaultStyles = true, render = (val) => val } = options;
  return (
    <ValueField valueType="string" options={options}>
      <span className="string-value" style={ useDefaultStyles ? defaultValueStyle : {} }>
        {render(value, model, options)}
      </span>
    </ValueField>
  );
};

StringField.propTypes = {
  model: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired
};

export default StringField;
