'use strict';

var Id = require('./Id');
var Parse = require('./StubParse');

function mappedFlatten(el) {
  if (el instanceof Parse.Object) {
    return {
      __type: 'Pointer',
      className: el.className,
      objectId: el.id
    };
  }
  return flatten(el);
}

/**
 * Convert a Parse Object or array of Parse Objects into a plain JS Object.
 */

function flatten(object) {
  if (Array.isArray(object)) {
    return object.map(mappedFlatten);
  }
  if (!(object instanceof Parse.Object)) {
    return object;
  }

  var flat = {
    id: new Id(object.className, object.id),
    className: object.className,
    objectId: object.id
  };
  if (object.createdAt) {
    flat.createdAt = object.createdAt;
  }
  if (object.updatedAt) {
    flat.updatedAt = object.updatedAt;
  }
  for (var attr in object.attributes) {
    var val = object.attributes[attr];
    if (val instanceof Parse.Object) {
      // We replace it with a pointer
      flat[attr] = mappedFlatten(val);
    } else if (Array.isArray(val)) {
      flat[attr] = val.map(mappedFlatten);
    } else {
      flat[attr] = val;
    }
  }

  return flat;
}

module.exports = flatten;