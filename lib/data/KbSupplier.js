import _ from 'lodash';
import sortBy from 'sort-by';

/*
 * Contract:
 * =========
 * supplier.findOne(id, idField='id')
 *   finds one item associated with the provided value.
 *   Returns a promise that will resolve to user identified object or undefined.
 *
 *   string: id - the id to match
 *   string: [idField] - the id accessor on the model. Defaults to 'id' i.e. model.id.
 *     Other common cases are mongo e.g. supplier.findOne(userId, '_id');
 *
 * supplier.findAll(options={})
 *   Finds all results that satisfy the options. Returns a promise that will
 *   ALWAYS resolve to an array. It will never be undefined.
 *
 *   integer [options.limit] - The max number of results to return. This is equivilent to pageSize.
 *   integer [options.offset] - The number of results to skip. Note that traditional
 *     pagination is supported by page = Math.floor(offset / limit)
 *   array [options.sort] - The sort constraints. This is a list of strings denoting
 *     the path of the property within the model. Default sort order is ASCENDING,
 *     but prepending the path with a "-" will enforce DESCENDING order. Each supplier
 *     will map these values to support its underlying protocol.
 *   array [options.filter] - A list of filters.
 *   string options.filter.path - The path of the property for filtering
 *   string options.filter.op - The operation to perform in the comparison. Supports
 *     `=`, `contains`, `<`, `<=`, `>`, `>=`
 *   string options.filter.value - The value to use for comparison
 */

function filtersToPredicate(filters) {
  return !_.isArray(filters) || filters.length === 0
      ? () => true
      : (model) => _.chain(filters)
      .map(({ path, op, value }) => {
        const val = _.head(_.at(model, path));
        switch (op) {
          case 'contains': return (val + '').indexOf(value) >= 0;
          case '<': return val < value;
          case '<=': return val <= value;
          case '>': return val > value;
          case '>=': return val >= value;
          case '=': return val === value;
        }
        return false;
      })
      .reduce((a, b) => a && b)
      .value();
}

const InMemorySupplier = function(items = []) {
  this.items = items;
  this.findOne = function(id, idField = 'id') {
    const res = _.chain(this.items).filter(item => item[idField] === id).head().value();
    return new Promise(resolve => resolve(res));
  };
  this.findAll = function(options = {}) {
    const { limit = 20, offset = 0, filter = [], sort = [] } = options,
        res = _.filter(this.items, filtersToPredicate(filter));
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
