import React from 'react';
import PropTypes from 'prop-types';
import { mapProps, lifecycle, withHandlers, compose } from 'recompose';



const EmbeddedObjectInput = ({ fields, model, onSubmit, onChange }) => {
  return (
    <div className="EmbeddedObjectInput">
      <form onSubmit={e => { e.preventDefault(); onSubmit(); }}>
        { fields.map((field, i) => (
          <div key={i}>
            {field._render(model, (newVal) => onChange(field, newVal))}
          </div>
        ))}
      </form>
    </div>
  );
}

EmbeddedObjectInput.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  model: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
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
