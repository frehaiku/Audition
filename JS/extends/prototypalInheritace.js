/*
* 原型式继承
* 缺陷：引用类型的值始终会共享相应的值，就像原型链模式一样
* */

function object(o) {
    var F = function () {};
    F.prototype = o;

    return new F();
}

var person = {
    name: 'Nicholas',
    friends: ['Shelby', 'Court', 'Haiku']
};

var instance1 = object(person);
instance1.name = 'Van';
instance1.friends.push('God');
console.log(instance1.name);
console.log(person.name);
console.log("person.friends: " + person.friends);

var instance2 = object(person);
instance2.friends.push('Git');

console.log(person.name);
console.log(person.friends);

/*ES6通过新增Object.create()方法规范了原型式的继承，
* 一个新对象的原型对象，
* 一个为新对象定义的额外属性的对象，
* 传入一个参数时，跟Object.create()与object()方法行为相同
* */
var instance3 = Object.create(person);
instance3.name = 'haiku';
instance3.friends.push('Rob');

console.log(person.friends);
