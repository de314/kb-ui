import React from 'react';
import PropTypes from 'prop-types';
import { mapProps, lifecycle, withHandlers, compose } from 'recompose';

const defaultContainerStyle = {
  marginTop: '20px',
  paddingLeft: '10px'
};

const defaultSubformStyle = {
  margin: '5px 20px',
  paddingLeft: '10px',
  paddingBottom: '15px',
  borderLeft: '2px solid #ccc',
  borderRadius: '10px'
};

const defaultLabelStyle = {
  display: 'block',
  fontSize: '1.5em',
  fontWeight: 'bold'
};

const EmbeddedObjectInput = ({ fields, model, options, onChange }) => {
  const { label, useDefaultStyles = true, raw = false } = options;
  return (
    <div className="EmbeddedObjectInput" style={ useDefaultStyles ? defaultContainerStyle : {} }>
      { raw || _.isUndefined(label) ? '' : (<span className="embedded-object-label" style={ useDefaultStyles ? defaultLabelStyle : {} }>{label}</span>) }
      <div style={ useDefaultStyles ? defaultSubformStyle : {} }>
        { fields.map((field, i) => (
          <div key={i}>
            {field._render(model, (newVal) => onChange(field, newVal))}
          </div>
        ))}
      </div>
    </div>
  );
}

EmbeddedObjectInput.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  model: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.func.isRequired
}

export default compose(
  mapProps(props => {
    console.log(props);
    const fields = _.cloneDeep(props.options.fields);
    // set all to !readOnly
    fields.filter(f => _.isUndefined(f.options.readOnly)).forEach(f => f.readOnly(false));
    return {
      ...props,
      fields,
      model: props.value,
      onChange: _.defaultTo(props.onChange, () => {})
    };
  }),
  lifecycle({
    componentWillMount() {
      const { fields, model, onChange } = this.props;
      console.log(model);
      fields.map(f => f.options)
          .filter(({ defaultValue }) => !_.isUndefined(defaultValue))
          .filter(({ path }) => _.chain(model).at(path).head().isUndefined().value())
          .forEach(({ path, defaultValue }) => _.set(model, path, defaultValue));
      onChange(model);
    },
  }),
  withHandlers({
    onChange: props => (field, newValue) => {
      const { model, setFormModel, onChange } = props;
      _.set(model, field.options.path, newValue);
      onChange(model);
    }
  })
)(EmbeddedObjectInput)
