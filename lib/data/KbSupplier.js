import _ from 'lodash';
import sortBy from 'sort-by';

const InMemorySupplier = function(items = []) {
  this.items = items;
  this.findOne = function(id, idField = 'id') {
    const res = _.chain(this.items).filter(item => item[idField] === id).head().value();
    return new Promise(resolve => resolve(res));
  };
  this.findAll = function(options = {}) {
    const { limit = 20, offset = 0, filter = () => true, sort = [] } = options,
        res = _.filter(this.items, filter);
    if (_.isArray(sort) && sort.length > 0) {
      res.sort(sortBy(...sort));
    }
    return new Promise(resolve => resolve({
      items: _.slice(res, offset, offset + limit),
      total: res.length,
      options
    }));
  };
  this.save = function(value) {
    this.items.push(value);
    return new Promise(resolve => resolve(value));
  };
  this.remove = function(id) {
    const res = _.remove(this.items, item => item.id === id);
    return new Promise(resolve => resolve(res));
  };
};

const suppliers = {
  mem: (items) => new InMemorySupplier(items)
};

export default suppliers;
