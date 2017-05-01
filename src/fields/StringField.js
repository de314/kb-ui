import React from 'react';
import PropTypes from 'prop-types';

import ValueField from './ValueField';

const StringField = ({ value, model, options }) => {
  const { render = (val) => val } = options;
  return (
    <ValueField valueType="string" options={options}>
      <span className="string-value">
        {render(value, model, options)}
      </span>
    </ValueField>
  );
};

StringField.propTypes = {
  model: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  value: PropTypes.any
};

export default StringField;
