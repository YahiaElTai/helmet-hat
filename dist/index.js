"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _helmetProps = _interopRequireDefault(require("./helmetProps"));

var helmetHat = function helmetHat(_ref) {
  var render = _ref.render;
  return render({
    helmetPropsFunc: _helmetProps["default"]
  });
};

var _default = helmetHat;
exports["default"] = _default;