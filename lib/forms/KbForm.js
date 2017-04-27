import React from 'react';
import _ from 'lodash';

import LabeledForm from './LabeledForm'

function KbForm(component = LabeledForm) {
  this.options = {
    component,
    defaultValue: {}
  };
}

const setters = [ 'component', 'defaultValue', 'fields', 'render' ];

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

KbForm.prototype._render = function(model, onSubmit, onChange) {
  const RenderComponent = _.defaultTo(this.options.render, this.options.component),
      val = _.defaultTo(model, this.options.defaultValue);
  return (<RenderComponent options={this.options} model={val} onSubmit={onSubmit} onChange={onChange} />);
};

export default (component) => new KbForm(component);
