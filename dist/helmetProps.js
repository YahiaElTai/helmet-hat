"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectWithoutProperties"));

var _utilities = require("./utilities");

var _favicon = _interopRequireDefault(require("./favicon"));

// Twitter title and description limitations
var twitterTitleMaxLen = 70;
var twitterDescMaxLen = 200;

var _default = function _default(_ref) {
  var _ref$helmetProps = _ref.helmetProps,
      helmetProps = _ref$helmetProps === void 0 ? {} : _ref$helmetProps;
  var base = helmetProps.base,
      defaultTitleProp = helmetProps.defaultTitleProp,
      description = helmetProps.description,
      image = helmetProps.image,
      _helmetProps$link = helmetProps.link,
      link = _helmetProps$link === void 0 ? [] : _helmetProps$link,
      _helmetProps$meta = helmetProps.meta,
      meta = _helmetProps$meta === void 0 ? [] : _helmetProps$meta,
      _helmetProps$og = helmetProps.og,
      ogParam = _helmetProps$og === void 0 ? {} : _helmetProps$og,
      property = helmetProps.property,
      siteName = helmetProps.siteName,
      favicon = helmetProps.favicon,
      title = helmetProps.title,
      titleTemplate = helmetProps.titleTemplate,
      _helmetProps$twitter = helmetProps.twitter,
      twitterParam = _helmetProps$twitter === void 0 ? {} : _helmetProps$twitter,
      url = helmetProps.url,
      _helmetProps$script = helmetProps.script,
      script = _helmetProps$script === void 0 ? [] : _helmetProps$script,
      _helmetProps$style = helmetProps.style,
      style = _helmetProps$style === void 0 ? [] : _helmetProps$style,
      rest = (0, _objectWithoutProperties2["default"])(helmetProps, ["base", "defaultTitleProp", "description", "image", "link", "meta", "og", "property", "siteName", "favicon", "title", "titleTemplate", "twitter", "url", "script", "style"]); // og

  var og = (0, _objectSpread2["default"])({}, siteName && {
    site_name: siteName
  }, title && {
    title: title
  }, description && {
    description: description
  }, image && {
    image: image
  }, url && {
    url: url
  }, ogParam); // twitter

  var twitter = (0, _objectSpread2["default"])({}, title && {
    title: title
  }, description && {
    description: description
  }, image && {
    image: image
  }, url && {
    url: url
  }, twitterParam);

  if (twitter.description) {
    twitter.description = (0, _utilities.truncate)(twitter.description, twitterDescMaxLen, '...');
  }

  if (twitter.title) {
    twitter.title = (0, _utilities.truncate)(twitter.title, twitterTitleMaxLen, '...');
  } // default title


  var defaultTitle = defaultTitleProp || siteName; // favicon

  if (favicon) {
    (0, _favicon["default"])(favicon, meta, link);
  }

  if (siteName && !(0, _utilities.hasObjectItem)(meta, 'name', 'application-name')) {
    meta.push({
      name: 'application-name',
      content: siteName
    });
  } // description


  if (description && !(0, _utilities.hasObjectItem)(meta, 'name', 'description')) {
    meta.push({
      name: 'description',
      content: description
    });
  } // image


  if (image && !(0, _utilities.hasObjectItem)(link, 'rel', 'apple-touch-startup-image')) {
    link.push({
      rel: 'apple-touch-startup-image',
      href: image
    });
  } // url


  if (url && !(0, _utilities.hasObjectItem)(link, 'rel', 'canonical')) {
    link.push({
      rel: 'canonical',
      href: url
    });
  } // set og


  (0, _utilities.forEach)(og, function (content, prop) {
    return content != null && meta.push({
      property: "og:".concat(prop),
      content: content
    });
  }); // set twitter

  (0, _utilities.forEach)(twitter, function (content, prop) {
    return content != null && meta.push({
      property: "twitter:".concat(prop),
      content: content
    });
  }); // property

  if (property) {
    (0, _utilities.forEach)(property, function (props, namespace) {
      return (0, _utilities.forEach)(props, function (content, prop) {
        return content != null && meta.push({
          property: "".concat(namespace, ":").concat(prop),
          content: content
        });
      });
    });
  }

  return (0, _objectSpread2["default"])({}, rest, defaultTitle && {
    defaultTitle: defaultTitle
  }, link.length && {
    link: link
  }, meta.length && {
    meta: meta
  }, title && {
    title: title
  }, script.length && {
    script: script
  }, style.length && {
    style: style
  }, base && (typeof base === 'string' ? {
    base: {
      href: base
    }
  } : {
    base: base
  }));
};

exports["default"] = _default;