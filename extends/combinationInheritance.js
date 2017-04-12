/**
 * 原型链和构造函数的组合式继承
 * Super---> name
 * Sub ---> age
 **/

function Super(name) {
    this.name = name;
}

Super.prototype.getName = function () {
    return this.name;
}

function Sub(name, age) {
    Super.call(this, name);
    this.age = age;
}

Sub.prototype = new Super();
Sub.constructor = Sub;
Sub.prototype.sayAge = function () {
    return this.age;
}

var instance1 = new Sub('haiku', 18);
console.log(instance1.getName());
console.log(instance1.sayAge());