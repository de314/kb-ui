import React from 'react';
import _ from 'lodash';

import LabeledDetailsView from './LabeledDetailsView';
import Datagrid from './Datagrid';

function KbView(component) {
  this.options = {
    component: component,
    defaultValue: {}
  };
}

const setters = [ 'component', 'fields', 'render', 'defaultValue', 'supplier' ];

setters.forEach(fieldName => {
  KbView.prototype[fieldName] = function(value) {
    this.options[fieldName] = value;
    return this;
  };
});

KbView.prototype.set = function(fieldName, value) {
  this.options[fieldName] = value;
  return this;
};

KbView.prototype.asList = function(component = Datagrid) {
  this.options.component = _.defaultTo(this.options.component, component);
  return this;
};

KbView.prototype.asDetails = function(component = LabeledDetailsView) {
  this.options.component = _.defaultTo(this.options.component, component);
  return this;
};

KbView.prototype._render = function(model) {
  const RenderComponent = _.defaultTo(this.options.render, this.options.component),
      val = _.defaultTo(model, this.options.defaultValue);
  return (<RenderComponent options={this.options} model={val} />);
};

export default (component) => new KbView(component);
