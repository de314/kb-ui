import React from 'react';
import _ from 'lodash';

import StringField from './StringField';
import BoolField from './BoolField';
import HtmlField from './HtmlField';

import StringInput from '../inputs/StringInput';
import BoolInput from '../inputs/BoolInput';
import EmbeddedObjectInput from '../inputs/EmbeddedObjectInput';
import EmbeddedListInput from '../inputs/EmbeddedListInput';

function KbField(path, type = 'string') {
  this.options = {
    path,
    type,
    label: _.capitalize(path.replace(/\./g, ' ')),
    defaultValue: _.defaultTo(_.defaultTo(this.RenderTypes[type], {}).defaultValue, '')
  };
}

KbField.prototype.RenderTypes = {
  bool: {
    field: BoolField,
    input: BoolInput,
    defaultValue: false
  },
  html: {
    field: HtmlField,
    input: StringInput
  },
  string: {
    field: StringField,
    input: StringInput
  },
  embeddedObject: {
    input: EmbeddedObjectInput,
    defaultValue: {}
  },
  embeddedList: {
    input: EmbeddedListInput,
    defaultValue: []
  },
  hidden: {
    field: () => (<span></span>),
    input: () => (<span></span>)
  }
  /* TODO: referenceObject, referenceList */
};

const setters = [ 'label', 'render', 'raw', 'readOnly', 'defaultValue', 'fields' /* TODO: mapIn, mapOut */ ];

setters.forEach(fieldName => {
  KbField.prototype[fieldName] = function(value) {
    this.options[fieldName] = value;
    return this;
  };
});

KbField.prototype.set = function(fieldName, value) {
  this.options[fieldName] = value;
  return this;
};

KbField.prototype._render = function(model = {}, onChange) {
  const renderAccessor = _.defaultTo(this.options.readOnly, true) ? 'field' : 'input',
      RenderComponent = _.defaultTo(this.RenderTypes[this.options.type], {})[renderAccessor],
      defaultValue = this.options.defaultValue,
      val = _.chain(model).at(this.options.path).head().defaultTo(_.isFunction(defaultValue) ? defaultValue() : defaultValue).value();
  if (_.isUndefined(RenderComponent)) {
    return _.defaultTo(this.options.render, (v) => (<span>{v + ''}</span>))(val, model, this.options);
  }
  return (<RenderComponent value={val} model={model} options={this.options} onChange={onChange} />);
};

export default (path, type) => new KbField(path, type);
