import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
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
  const { label, raw = false } = options;
  return (
    <div className="EmbeddedObjectInput">
      { raw || _.isUndefined(label) ? '' : (<span className="embedded-label">{label}</span>) }
      <div className="embedded-fields">
        { fields.map((field, i) => (
          <div key={i}>
            {field._render(model, (newVal) => onChange(field, newVal))}
          </div>
        ))}
      </div>
    </div>
  );
};

EmbeddedObjectInput.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  model: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired
};

export default compose(
  mapProps(props => {
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
      fields.map(f => f.options)
          .filter(({ defaultValue }) => !_.isUndefined(defaultValue))
          .filter(({ path }) => _.chain(model).at(path).head().isUndefined().value())
          .forEach(({ path, defaultValue }) => _.set(model, path, defaultValue));
      onChange(model);
    }
  }),
  withHandlers({
    onChange: props => (field, newValue) => {
      const { model, onChange } = props;
      _.set(model, field.options.path, newValue);
      onChange(model);
    }
  })
)(EmbeddedObjectInput);
