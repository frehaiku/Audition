/**
 * Created by 海枯 on 2017/11/28.
 */

/**
 * new运算符内部实现
 */
function newPolyfill(constructor, ...args) {
  var obj = {}
  obj.__proto__ = constructor.prototype
  var ret = constructor.apply(obj, args)
  return typeof ret == 'object' ? ret : obj
}

function newPolyfillNoProto(constructor, ...args) {
  var obj
  var F = function () {}
  F.prototype = constructor.prototype
  obj = new F()

  var ret = constructor.apply(obj, args)
  return typeof ret == 'object' ? ret : obj
}

function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.sayName = function () {
  console.log(this.name)
}

var i1 = newPolyfill(Person, 'xuzhipeng', 22)
console.log(i1.name)
console.log(i1.age)
i1.sayName()