import React from 'react';
import PropTypes from 'prop-types';
import { mapProps, lifecycle, withHandlers, compose } from 'recompose';

import EmbeddedObjectInput from './EmbeddedObjectInput';

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

const EmbeddedListInput = ({ fields, models, options, onAdd, onChangeAtIndex, onRemove }) => {
  const { label, useDefaultStyles = true, raw = false } = options,
      subOptions = _.assignIn({}, options, { raw: true });
  return (
    <div className="EmbeddedListInput" style={ useDefaultStyles ? defaultContainerStyle : {} }>
      <div className="label-row">
        { raw || _.isUndefined(label) ? '' : (<span className="embedded-object-label" style={ useDefaultStyles ? defaultLabelStyle : {} }>{label}</span>) }
      </div>
      <div className="items-row">
        { models.map((model, i) => {
          return (
            <div key={i}>
              <EmbeddedObjectInput
                value={model}
                options={subOptions}
                onChange={newVal => onChangeAtIndex(i, newVal)}
              />
              <div>
                <button onClick={e => { e.preventDefault(); onRemove(i); }}>Remove</button>
              </div>
            </div>
          )
        })}
      </div>
      <div className="add-row">
        <button onClick={e => { e.preventDefault(); onAdd(); }}>Add One</button>
      </div>
    </div>
  );
}

EmbeddedListInput.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  models: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAdd: PropTypes.func.isRequired,
  onChangeAtIndex: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired
}

function initModel(model, fields) {
  fields.map(f => f.options)
      .filter(({ defaultValue }) => !_.isUndefined(defaultValue))
      .filter(({ path }) => _.chain(model).at(path).head().isUndefined().value())
      .forEach(({ path, defaultValue }) => _.set(model, path, defaultValue));
  return model;
}

export default compose(
  mapProps(props => {
    const fields = _.cloneDeep(props.options.fields);
    // set all to !readOnly
    fields.filter(f => _.isUndefined(f.options.readOnly)).forEach(f => f.readOnly(false));
    return {
      ...props,
      fields,
      models: props.value,
      onChange: _.defaultTo(props.onChange, () => {})
    };
  }),
  lifecycle({
    componentWillMount() {
      const { fields, models, onChange } = this.props;
      models.forEach(model => initModel(model, fields));
      onChange(models);
    },
  }),
  withHandlers({
    onAdd: props => () => {
      const { fields, models, onChange } = props,
          model = initModel({}, fields);
      models.push(model);
      onChange(models);
    },
    onChangeAtIndex: props => (i, newValue) => {
      const { models, onChange } = props;
      models[i] = newValue;
      onChange(models);
    },
    onRemove: props => (i) => {
      const { models, onChange } = props;
      _.pullAt(models, i);
      onChange(models);
    }
  })
)(EmbeddedListInput)
