import React from 'react';
import PropTypes from 'prop-types';
import kb from '../lib/kb-ui';

const codeStyle = {
  width: "600px",
  padding: "10px",
  backgroundColor: "#CCC",
  overflow: "scroll"
};

const ViewDemo = ({ model, view, viewDef }) => {
  return (
    <div className="ViewDemo">
      {view._render(model)}
      <div>
        <hr />
        <h4>Fields Configurations</h4>
        <div style={codeStyle}>
          <pre>{viewDef}</pre>
        </div>
        <h4>Model</h4>
        <div style={codeStyle}>
          <pre>{JSON.stringify(model, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}

ViewDemo.propTypes = {
  model: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired,
  view: PropTypes.object.isRequired,
  viewDef: PropTypes.string.isRequired
}

export default ViewDemo
