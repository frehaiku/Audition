/**
 * 原型链继承
 */

function Super() {
    this.property = true;
    this.bugArr = ['red', 'blue'];
    this.bugObject = {};
}

Super.prototype.getSuperValue = function () {
    return this.property;
}

function Sub() {
    this.subProperty = false;
}

Sub.prototype = new Super();

Sub.prototype.getSubProperty = function () {
    return this.subProperty;
}

var subClass = new Sub();
subClass.constructor = Sub;

// 改变 bugArr与bugObject
subClass.bugArr.push('green');
subClass.bugObject.color = 'green';

console.log(subClass.getSuperValue());

/*判断是否属于某个实例*/
console.log("subClass is belong to Sub? " + (subClass instanceof Sub));
console.log("subClass is belong to Super? " + (subClass instanceof Super));
console.log("subClass is belong to Object? " + (subClass instanceof Object));

console.log("---------isPrototypeOf---------");

/*第二种方式是用isPrototypeOf方法*/
console.log("subClass is belong to Sub? " + (Sub.prototype.isPrototypeOf(subClass)));
console.log("subClass is belong to Super? " + (Super.prototype.isPrototypeOf(subClass)));
console.log("subClass is belong to Object? " + (Super.prototype.isPrototypeOf(subClass)));

var subClass1 = new Sub();
// 原型继承的第一个问题 当是包含引用类型值的原型，与subClass共享了同一个成员，
console.log("subClass1 bugArr " + subClass1.bugArr);
console.log("subClass1 bugObject " + subClass1.bugObject);

// 原型继承的第二个问题是 没有办法在不影响所有对象实例的情况下，给超类型的构造函数传递参数