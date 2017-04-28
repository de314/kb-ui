import React from 'react';
import _ from 'lodash';

import SuppliedForm from './SuppliedForm';

import LabeledForm from './LabeledForm'

function KbForm(component = LabeledForm) {
  this.options = {
    component,
    defaultValue: {}
  };
}

const setters = [ 'component', 'defaultValue', 'fields', 'render', 'supplier' ];

setters.forEach(fieldName => {
  KbForm.prototype[fieldName] = function(value) {
    this.options[fieldName] = value;
    return this;
  };
});

KbForm.prototype.set = function(fieldName, value) {
  this.options[fieldName] = value;
  return this;
};

KbForm.prototype._render = function(modelOrId, onSubmit, onChange) {
  const RenderComponent = _.defaultTo(this.options.render, this.options.component),
      supplier = this.options.supplier;
  let model = _.isPlainObject(modelOrId) ? modelOrId : undefined;
  if (!_.isUndefined(supplier)) {
    onSubmit = _.defaultTo(onSubmit, supplier.save);
  }
  if (_.isUndefined(model) && _.isString(modelOrId) && !_.isUndefined(supplier)) {
    return (<SuppliedForm component={RenderComponent} model={modelOrId} options={this.options} onSubmit={onSubmit} onChange={onChange} />);
  }
  model = _.defaultTo(model, this.options.defaultValue);
  return (<RenderComponent options={this.options} model={model} onSubmit={onSubmit} onChange={onChange} />);
};

export default (component) => new KbForm(component);
