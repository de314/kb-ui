import suppliers from '../../lib/data/KbSupplier';

describe('KbSupplier', function() {
  it('should initialize with default values', function(done) {
    const mem = suppliers.mem();
    mem.findAll().then(res => expect(res).toEqual([])).then(done);
  });

  /* FIND ONE */
  it('should find first by id', function(done) {
    const items = [ { id: 0 }, { id: 1 } ],
        mem = suppliers.mem(items);
    mem.findOne(0).then(res => expect(res).toEqual(items[0])).then(done);
  });
  it('should find by id', function(done) {
    const items = [ { id: 0 }, { id: 1 } ],
        mem = suppliers.mem(items);
    mem.findOne(1).then(res => expect(res).toEqual(items[1])).then(done);
  });
  it('should return undefined for missing id', function(done) {
    const items = [ { id: 0 }, { id: 1 } ],
        mem = suppliers.mem(items);
    mem.findOne(1000).then(res => expect(res).toBeUndefined()).then(done);
  });

  /* FIND ALL */
  it('should find all (default)', function(done) {
    const items = [ { id: 0 }, { id: 1 } ],
        mem = suppliers.mem(items);
    mem.findAll().then(res => expect(res).toEqual(items)).then(done);
  });
  it('should find all', function(done) {
    const items = [ { id: 0 }, { id: 1 } ],
        mem = suppliers.mem(items);
    mem.findAll({}).then(res => expect(res).toEqual(items)).then(done);
  });

  /* LIMIT / OFFSET */
  it('should return 1', function(done) {
    const items = [ { id: 0 }, { id: 1 }, { id: 2 }, { id: 3 } ],
        mem = suppliers.mem(items);
    mem.findAll({ limit: 1}).then(res => expect(res).toEqual([ items[0] ])).then(done);
  });
  it('should return 2', function(done) {
    const items = [ { id: 0 }, { id: 1 }, { id: 2 }, { id: 3 } ],
        mem = suppliers.mem(items);
    mem.findAll({ limit: 2}).then(res => expect(res).toEqual([ items[0], items[1] ])).then(done);
  });
  it('should return all for large limit', function(done) {
    const items = [ { id: 0 }, { id: 1 }, { id: 2 }, { id: 3 } ],
        mem = suppliers.mem(items);
    mem.findAll({ limit: 1000 }).then(res => expect(res).toEqual(items)).then(done);
  });
  it('should offset results', function(done) {
    const items = [ { id: 0 }, { id: 1 }, { id: 2 }, { id: 3 } ],
        mem = suppliers.mem(items);
    mem.findAll({ offset: 1 }).then(res => expect(res).toEqual([ items[1], items[2], items[3] ])).then(done);
  });
  it('should offset results by page', function(done) {
    const items = [ { id: 0 }, { id: 1 }, { id: 2 }, { id: 3 } ],
        mem = suppliers.mem(items);
    mem.findAll({ offset: 2 }).then(res => expect(res).toEqual([ items[2], items[3] ])).then(done);
  });
  it('should allow paging', function(done) {
    const items = [ { id: 0 }, { id: 1 }, { id: 2 }, { id: 3 } ],
        mem = suppliers.mem(items);
    mem.findAll({ limit: 2, offset: 1 }).then(res => expect(res).toEqual([ items[1], items[2] ])).then(done);
  });
  it('should return past last record', function(done) {
    const items = [ { id: 0 }, { id: 1 }, { id: 2 }, { id: 3 } ],
        mem = suppliers.mem(items);
    mem.findAll({ offset: 1000 }).then(res => expect(res).toEqual([])).then(done);
  });

  /* FILTERS */
  it('should filter by predicate simple', function(done) {
    const items = [ { age: 10 }, { age: 18 }, { age: 21 }, { age: 30 }, { age: 65 } ],
        mem = suppliers.mem(items);
    mem.findAll({ filter: (v) => v.age < 18}).then(res => expect(res).toEqual([ items[0] ])).then(done);
  });
  it('should filter by predicate complex', function(done) {
    const items = [ { age: 10 }, { age: 18 }, { age: 21 }, { age: 30 }, { age: 65 } ],
        mem = suppliers.mem(items);
    mem.findAll({ filter: (v) => v.age >= 21 && v.age < 60 }).then(res => expect(res).toEqual([ items[2], items[3] ])).then(done);
  });
  it('should filter by match', function(done) {
    const items = [ { age: 10 }, { age: 18 }, { age: 21 }, { age: 30 }, { age: 65 } ],
        mem = suppliers.mem(items);
    mem.findAll({ filter: { age: 18 }}).then(res => expect(res).toEqual([ items[1] ])).then(done);
  });
  it('should filter by property', function(done) {
    const items = [ { age: 10 }, { age: 18 }, { age: 21 }, { age: 30 }, { age: 65 } ],
        mem = suppliers.mem(items);
    mem.findAll({ filter: 'age' }).then(res => expect(res).toEqual(items)).then(done);
  });
  it('should filter by missing property', function(done) {
    const items = [ { age: 10 }, { age: 18 }, { age: 21 }, { age: 30 }, { age: 65 } ],
        mem = suppliers.mem(items);
    mem.findAll({ filter: 'name' }).then(res => expect(res).toEqual([])).then(done);
  });

  /* SORTS */
  it('should sort by field asc', function(done) {
    const items = [ { age: 100 }, { age: 21 }, { age: 18 }, { age: 65 }, { age: 30 } ],
        mem = suppliers.mem(items);
    mem.findAll({ sort: [ 'age' ] }).then(res => expect(res).toEqual([ items[2], items[1], items[4], items[3], items[0] ])).then(done);
  });
  it('should sort by field desc', function(done) {
    const items = [ { age: 100 }, { age: 21 }, { age: 18 }, { age: 65 }, { age: 30 } ],
        mem = suppliers.mem(items);
    mem.findAll({ sort: [ '-age' ] }).then(res => expect(res).toEqual([ items[0], items[3], items[4], items[1], items[2] ])).then(done);
  });
  it('should sort multi level sort', function(done) {
    const items = [ { s: 'a', n: 1 }, { s: 'a', n: 2 }, { s: 'b', n: 1 }, { s: 'b', n: 2 }, { s: 'c', n: 3 } ],
        mem = suppliers.mem(items);
    mem.findAll({ sort: [ 's', '-n' ] }).then(res => expect(res).toEqual([ items[1], items[0], items[3], items[2], items[4] ])).then(done);
  });
});
