import React from 'react'
import PropTypes from 'prop-types'

const codeStyle = {
  width: "600px",
  padding: "10px",
  backgroundColor: "#CCC",
  overflow: "scroll",
}

const FieldsDemo = ({ model, fields, fieldsDef }) => {
  return (
    <div className="FieldsDemo">
      {fields.map((field,i) => (
        <div id={i}>
          {field._render(model)}
        </div>
      ))}
      { _.isUndefined(fieldsDef) ? '' : (
        <div>
          <hr />
          <h4>Fields Configurations</h4>
          <div style={codeStyle}>
            <pre>{fieldsDef}</pre>
          </div>
          <h4>Model</h4>
          <div style={codeStyle}>
            <pre>{JSON.stringify(model, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default FieldsDemo
