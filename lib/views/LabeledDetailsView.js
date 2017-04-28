import React from 'react';
import PropTypes from 'prop-types';

const LabeledDetailsView = ({ model, options }) => {
  return (
    <div className="LabeledDetailsView">
      {options.fields.map((field, i) => (
        <div key={i}>
          {field._render(model)}
        </div>
      ))}
    </div>
  );
};

LabeledDetailsView.propTypes = {
  model: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired
};

export default LabeledDetailsView;
