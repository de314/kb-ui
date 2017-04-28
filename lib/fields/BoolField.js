import React from 'react';
import PropTypes from 'prop-types';

import ValueField from './ValueField';

const defaultValueStyle = (value) => ({
  color: value ? 'green' : 'red',
  fontWeight: 'bold'
});

const BoolField = ({ value, options }) => {
  return (
    <ValueField valueType="bool" options={options}>
      <span className={`bool-value bool-value-${value}`}>
        {value + ''}
      </span>
    </ValueField>
  );
};

BoolField.propTypes = {
  model: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  value: PropTypes.bool.isRequired
};

export default BoolField;
