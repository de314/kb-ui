import React from 'react';
import PropTypes from 'prop-types';

import ValueField from './ValueField';

const HtmlField = ({ value, options }) => {
  return (

    <ValueField valueType="html" options={options}>
      <span className="html-value" dangerouslySetInnerHTML={{ __html: value }} />
    </ValueField>
  );
};

HtmlField.propTypes = {
  model: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired
};

export default HtmlField;
