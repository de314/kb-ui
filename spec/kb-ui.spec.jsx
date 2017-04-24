import React from 'react/addons';
import KbUi from '../lib/kb-ui.jsx';

describe('KbUi', function() {
  var component;

  beforeEach(function() {
    component = React.addons.TestUtils.renderIntoDocument(
      <KbUi/>
    );
  });

  it('should render', function() {
    expect(component.getDOMNode().className).toEqual('kb-ui');
  });
});
