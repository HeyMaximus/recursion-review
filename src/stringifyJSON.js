// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
//I: an object, likely nested data.
//O: a string made of the input object (includes '{}, :')
//E: non-stringable objects;
  // undefined, and functions
var stringifyJSON = function(obj) {
  var stringifyed = '';
  var isNull = false;
  if (typeof obj === 'null') {
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
    //brackets
    stringifyed += '[';
    obj.forEach(function(item, index) {
      if (isFunc || isUndefined) {
        stringifyed += 'null';
      } else {
        stringifyJSON(item);
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
    if (Object.keys(obj).length === 0) {
      stringifyed += 'null';
    }
    for (var key in obj) {

      var value = obj[key];
      var isObj = value.constructor.name === 'Object';
      var isUndefined = typeof value === 'undefined';

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
  //if obj is an array, do the following
    //undefined etc returns null
  //if obj is an object, do the following
    //undefined etc is omitted
  // if obj is undefined or a function, return undefined.

  return stringifyed;
};
