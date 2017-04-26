import React from 'react';
import _ from 'lodash';

import StringField from './StringField';
import BoolField from './BoolField';
import HtmlField from './HtmlField';

function KbField(path, type = 'string') {
  this.options = {
    path,
    type,
    label: _.capitalize(path.replace(/\./g, ' '))
  };
  // this.detailLink = this.path === 'id';
  // this.isDetailLink = (isDetailLink) => { self.detailLink = isDetailLink; return self };
}

KbField.prototype.RenderTypes = {
  bool: {
    field: BoolField
  },
  html: {
    field: HtmlField
  },
  string: {
    field: StringField
  }
};

KbField.prototype.ViewRenderTypes = {
  bool: (value, model, options) => (<BoolField value={value} model={model} options={options} />),
  html: (value, model, options) => (<HtmlField value={value} model={model} options={options} />),
  string: (value, model, options) => (<StringField value={value} model={model} options={options} />)
};

const setters = [ 'label', 'render', 'raw', 'readOnly' ];

setters.forEach(fieldName => {
  KbField.prototype[fieldName] = function(value) {
    this.options[fieldName] = value;
    return this;
  };
});

KbField.prototype._render = function(model) {
  const renderAccessor = _.defaultTo(this.options.readOnly, true) ? 'field' : 'input',
      RenderComponent = _.defaultTo(this.RenderTypes[this.options.type], {})[renderAccessor],
      val = _.chain(model).at(this.options.path).head().value();
  if (_.isUndefined(RenderComponent)) {
    return _.defaultTo(this.options.render, (v) => (<span>{v + ''}</span>))(val, model, this.options);
  }
  return (<RenderComponent value={val} model={model} options={this.options} />)
};

export default (path, type) => new KbField(path, type);
