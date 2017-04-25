import React from 'react'
import _ from 'lodash'

import StringField from './StringField'
import BoolField from './BoolField'
import HtmlField from './HtmlField'

function field(path, type = 'string') {
  const self = this;
  this.options = {
    path,
    type,
    label: _.capitalize(path.replace(/\./g, ' '))
  };
  // this.detailLink = this.path === 'id';
  // this.isDetailLink = (isDetailLink) => { self.detailLink = isDetailLink; return self };
}

field.prototype.ViewRenderTypes = {
  string: (value, model, options) => (<StringField value={value} model={model} options={options} />),
  bool: (value, model, options) => (<BoolField value={value} model={model} options={options} />),
  html: (value, model, options) => (<HtmlField value={value} model={model} options={options} />),
}

const setters = [ 'label', 'render', 'raw' ];

setters.forEach(fieldName => {
  field.prototype[fieldName] = function(value) {
    this.options[fieldName] = value;
    return this;
  }
})

field.prototype._render = function(model, isView = true) {
  const renderTypes = isView ? this.ViewRenderTypes : this.ViewRenderTypes, // TODO: formRenderTypes
      render = _.defaultTo(this.ViewRenderTypes[this.options.type], _.defaultTo(this.options.render, (val) => (<span>{val + ''}</span>))),
      val = _.chain(model).at(this.options.path).head().value();
  return render(val, model, this.options);
}

export default (path, type) => new field(path, type)
