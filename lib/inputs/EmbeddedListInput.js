import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { mapProps, lifecycle, withHandlers, compose } from 'recompose';

import EmbeddedObjectInput from './EmbeddedObjectInput';

const EmbeddedListInput = ({ models, options, onAdd, onChangeAtIndex, onRemove }) => {
  const { label, raw = false, empty = 'There is nothing here.' } = options,
      subOptions = _.assignIn({}, options, { raw: true });
  return (
    <div className="EmbeddedListInput">
      <div className="label-row">
        { raw || _.isUndefined(label) ? '' : (<span className="embedded-label">{label}</span>) }
         <button className="btn btn-lg" onClick={e => { e.preventDefault(); onAdd(); }}>Add One</button>
      </div>
      <div className="items-row">
        { models.length !== 0 ? '' : <div className="no-items">{empty}</div> }
        { models.map((model, i) => {
          return (
            <div key={i}>
              <EmbeddedObjectInput
                value={model}
                options={subOptions}
                onChange={newVal => onChangeAtIndex(i, newVal)}
              />
              <div>
                <button className="btn btn-xs btn-danger" onClick={e => { e.preventDefault(); onRemove(i); }}>Remove</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

EmbeddedListInput.propTypes = {
  models: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAdd: PropTypes.func.isRequired,
  onChangeAtIndex: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired
};

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
    }
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
)(EmbeddedListInput);
