import _ from 'lodash';

function KbCollection(supplier) {
  this.options = {
    supplier: supplier,
    defaultValue: {}
  };
}

const setters = [ 'singular', 'plural', 'slug', 'supplier' ];

setters.forEach(fieldName => {
  KbCollection.prototype[fieldName] = function(value) {
    this.options[fieldName] = value;
    return this;
  };
});

KbCollection.prototype.set = function(fieldName, value) {
  this.options[fieldName] = value;
  return this;
};

KbCollection.prototype.create = function(form) {
  this.options.create = form;
  form.supplier(_.defaultTo(form.options.supplier, this.options.supplier));
  return this;
};

KbCollection.prototype.edit = function(form) {
  this.options.edit = form;
  form.supplier(_.defaultTo(form.options.supplier, this.options.supplier));
  return this;
};

KbCollection.prototype.list = function(view) {
  this.options.list = view;
  view.asList();
  view.supplier(_.defaultTo(view.options.supplier, this.options.supplier));
  return this;
};

KbCollection.prototype.details = function(view) {
  this.options.details = view;
  view.asDetails();
  view.supplier(_.defaultTo(view.options.supplier, this.options.supplier));
  return this;
};

KbCollection.prototype.renderCreate = function(onSubmit, onChange) {
  return this.options.create._render(undefined, onSubmit, onChange);
};

KbCollection.prototype.renderEdit = function(id, onSubmit, onChange) {
  return this.options.edit._render(id, onSubmit, onChange);
};

KbCollection.prototype.renderList = function() {
  return this.options.list._render();
};

KbCollection.prototype.renderDetails = function(id) {
  return this.options.details._render(id);
};

export default (supplier) => new KbCollection(supplier);
