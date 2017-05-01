import _ from 'lodash';
import kb from '../lib/kb-ui';

describe('ReactComponentNpm', function() {

  it('should have collection defined', function() {
    expect(kb.collection).toBeDefined();
  });
  it('should have field defined', function() {
    expect(kb.field).toBeDefined();
  });
  it('should have form defined', function() {
    expect(kb.form).toBeDefined();
  });
  it('should have suppliers defined', function() {
    expect(kb.suppliers).toBeDefined();
  });
  it('should have view defined', function() {
    expect(kb.view).toBeDefined();
  });
});
