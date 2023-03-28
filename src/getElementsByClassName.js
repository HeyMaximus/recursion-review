// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className, element
) {

  var resultArray = [];
  var element = element || document.body;

  if (element.classList.contains(className)) { //
    resultArray.push(element);
  }

  if (element.children) {
    element.children.forEach (function(i) {
      resultArray = resultArray.concat(getElementsByClassName(className, i));
    });
  }

  return resultArray;

};