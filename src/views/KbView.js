import React from 'react';
import _ from 'lodash';

import SuppliedView from './SuppliedView';
import LabeledDetailsView from './LabeledDetailsView';
import Datagrid from './Datagrid';

function KbView(component) {
  this.options = {
    component: component,
    defaultValue: {}
  };
}

const setters = [ 'component', 'fields', 'render', 'defaultValue', 'supplier', 'idField' ];

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

KbView.prototype._render = function(modelOrId) {
  const RenderComponent = _.defaultTo(this.options.render, this.options.component);
  let model = _.isPlainObject(modelOrId) ? modelOrId : undefined;
  if (_.isUndefined(model) && _.isString(modelOrId) && !_.isUndefined(this.options.supplier)) {
    return (<SuppliedView component={RenderComponent} model={modelOrId} options={this.options} />);
  }
  model = _.defaultTo(model, this.options.defaultValue);
  return (<RenderComponent options={this.options} model={model} />);
};

export default (component) => new KbView(component);
