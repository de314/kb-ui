import React from 'react';
import PropTypes from 'prop-types';

import ValueInput from './ValueInput';

function defaultRender(value, onChange) {
  return (<input type="text" value={value} onChange={onChange} />);
}

const StringInput = ({ value, model, options, onChange }) => {
  const { useDefaultStyles = true, render = defaultRender } = options;
  return (
    <ValueField valueType="string" options={options}>
      <span className="string-input" style={ useDefaultStyles ? defaultValueStyle : {} }>
        {render(value, onChange, model, options)}
      </span>
    </ValueField>
  );
};

StringInput.propTypes = {
  model: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired,
  value: PropTypes.node.isRequired
}

export default StringInput
