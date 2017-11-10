/*
* 寄生组合式继承
* 背景：在组件继承中，父级的构造函数被调用了两次，而且子对象中存在着两个实例属性（实例一个，原型链一个），造成了实例属性冗余
* 该种继承方式，在组合继承的基础上，用寄生式继承，继承父级原型链中的方法
* */

function parasiticInherit(obj) {
    var o = Object(obj.prototype);
    o.constructor = obj;
    return o;
}

function Super(name) {
    this.name = name;
    this.colors = ['red', 'blue'];
}

Super.prototype.sayName = function () {
    console.log(this.name);
}

function Sub() {
    Super.apply(this, arguments);

    this.age = arguments[1];
}

Sub.prototype = parasiticInherit(Super);
Sub.constructor = Sub;

Sub.prototype.sayAge = function () {
    console.log(this.age);
}

var instance1 = new Sub('haiku', 18);
instance1.colors.push('green');

console.log(instance1.sayName());

console.log(instance1.sayAge());