# kb ui

Get the AMD module located at `kb-ui.js` and include it in your project.

Here is a sample integration:

```js
require.config({
  paths: {
    'react': 'vendor/bower_components/react/react',
    'KbUi': 'kb-ui'
  }
});

require(['react', 'KbUi'], function(React, KbUi) {

  React.render(React.createElement(KbUi), document.getElementById('widget-container'));

});
```

## Development

* Development server `npm start`.
* Continuously run tests on file changes `npm run watch-test`;
* Run tests: `npm test`;
* Build `npm run build`;
