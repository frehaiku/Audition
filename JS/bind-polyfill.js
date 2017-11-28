Function.prototype.selfBind = function (oThis) {
  if (typeof this !== 'function')
    throw new TypeError(
      "Function.prototype.bind - what is trying " +
      "to be bound is not callable"
    )
  var args = [].slice.call(arguments, 1),
    fnThs = this;

  var f = function () {
  }
  var fBound = function () {
    return fnThs.apply(
      this instanceof f
        ? this : oThis
      , args.concat(Array.prototype.slice.call(arguments))
    )
  }
  // 若是new运算符时，则继承构造函数的prototype
  // 也便于对new运算符情况的判断 `this instanceof f`
  f.prototype = this.prototype
  fBound.prototype = new f()
  return fBound
};

var a = {
  age: 18, getAge: function () {
    console.log([].slice.call(arguments).reduce(function (a, b) {
      return a + b;
    }))
  }
}


var b = {age: 20}

a.getAge.selfBind(b, 18)(20);

/**对new 运算符的特殊处理**/
function foo(n) {
  this.name = n
}
var obj = {age: 22}
var bind = foo.bind(obj)

bind('frehaiku')
// 'frehaiku'
console.log(obj.name)

var bar = new bind('xuzhipeng')
// 'frehaiku'
console.log(obj.name)
// 'xuzhipeng'
console.log(bar.name)