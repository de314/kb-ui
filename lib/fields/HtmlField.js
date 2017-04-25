import React from 'react';
import PropTypes from 'prop-types';

import ValueField from './ValueField';

const defaultValueStyle = {
  display: 'inline-block'
};

const HtmlField = ({ value, options }) => {
  const { useDefaultStyles = true } = options;
  return (

    <ValueField valueType="html" options={options}>
      <span className="html-value" style={ useDefaultStyles ? defaultValueStyle : {} } dangerouslySetInnerHTML={{ __html: value }} />
    </ValueField>
  );
};

HtmlField.propTypes = {
  model: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired
};

export default HtmlField;
