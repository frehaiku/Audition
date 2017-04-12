/*
* 构造函数模式
* 问题：方法都在构造函数定义，因此函数复用无法提起
* 而且在超类型定义的方法，在子类型是不可见的
* */

function Super(name) {
    this.name = name;
    this.colors = ['red', 'blue'];
}

function Sub(name) {
    Super.call(this, name);

    this.age = 18;
}

var instance1 = new Sub('haiku');
instance1.colors.push('green');
console.log(instance1.colors);

var instance2 = new Sub('Nicholas');
console.log(instance2.colors);
console.log(instance2.age);