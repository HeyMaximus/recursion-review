// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  var stringifyed = '';
  var isNull = false;
  if (obj === null) {
    isNull = true;
  }

  if (!isNull) {
    var isString = typeof obj === 'string';
    var isNum = typeof obj === 'number';
    var isBool = typeof obj === 'boolean';
    var isArray = Array.isArray(obj);
    var isObj = typeof obj === 'object' && !isArray;
    var isUndefined = typeof obj === 'undefined';
    var isFunc = typeof obj === 'function';
  }

  if (isNum || isBool) {
    stringifyed += obj;
  }
  if (isString) {
    stringifyed += '\"' + obj + '\"';
  }
  if (isNull) {
    stringifyed += 'null';
  }
  if (isFunc || isUndefined) {
    return undefined;
  }
  if (isArray) {
    stringifyed += '[';
    obj.forEach(function(item, index) {
      if (isFunc || isUndefined) {
        stringifyed += 'null';
      } else {
        stringifyed += stringifyJSON(item);
      }
      if (index < obj.length - 1) {
        stringifyed += ',';
      }
    });
    stringifyed += ']';
  }

  if (isObj) {
    stringifyed += '{';
    var tempArr = [];
    for (var key in obj) {

      var value = obj[key];
      var isFunc = typeof value === 'function';
      var isUndefined = value === undefined;

      if (!isFunc && !isUndefined) {
        var tempstring = '';
        tempstring += stringifyJSON(key);
        tempstring += ':';
        tempstring += stringifyJSON(value);
        tempArr.push(tempstring);
      }
    }
    stringifyed += tempArr.join(',');
    stringifyed += '}';
  }

  return stringifyed;
};
