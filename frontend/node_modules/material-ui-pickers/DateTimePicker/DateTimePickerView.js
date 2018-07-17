'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateTimePickerView = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _withStyles = require('@material-ui/core/styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _Fade = require('@material-ui/core/Fade');

var _Fade2 = _interopRequireDefault(_Fade);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DateTimePickerView = exports.DateTimePickerView = function DateTimePickerView(props) {
  var view = props.view,
      selected = props.selected,
      children = props.children,
      classes = props.classes,
      timeout = props.timeout;


  if (timeout) {
    return _react2.default.createElement(
      _Fade2.default,
      {
        'in': view === selected,
        timeout: timeout,
        mountOnEnter: true,
        unmountOnExit: true
      },
      _react2.default.createElement(
        'div',
        { className: classes.view },
        children
      )
    );
  }

  if (view !== selected) {
    return null;
  }

  return _react2.default.createElement(
    'div',
    { className: classes.view },
    children
  );
};

DateTimePickerView.propTypes = {
  timeout: _propTypes2.default.number,
  view: _propTypes2.default.string.isRequired,
  selected: _propTypes2.default.string.isRequired,
  children: _propTypes2.default.node.isRequired,
  classes: _propTypes2.default.object.isRequired
};

DateTimePickerView.defaultProps = {
  timeout: undefined
};

var styles = {
  view: {
    zIndex: 1,
    position: 'absolute',
    left: 0,
    right: 0
  }
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiPickerDTPickerView ' })(DateTimePickerView);