const defaultOptions = {

}

function _View(options) {
  _.assignIn(this, defaultOptions, options);
}

export default (options = {}) => new _View(options)
