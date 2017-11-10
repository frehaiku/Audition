/*
* 寄生式继承
* 思路与寄生构造函数和工厂模式类似，创建一个仅用于封装继承过程的函数
* 该函数以某种方式来增强对象，返回新对象的函数
*
* 缺点：达不到函数的复用
* */

/**
 * 对象深复制函数
 * @param obj
 * @returns clone
 */
function cloneObj(obj) {
    var twin;
    var typeFn = function (val) {
        return Object.prototype.toString.call(val);
    }
    if (typeFn(obj) === "[object Array]") {
        twin = obj.slice();
    } else if (obj instanceof Object) {
        twin = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                twin[attr] = cloneObj(obj[attr]);
            }
        }
    } else {
        twin = obj;
    }

    return twin;
}
function extend(original) {

    var clone = cloneObj(original);
    clone.sayHi = function () {
        console.log('Hi');
    }
    return clone;
}

var person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};

var instance1 = extend(person);
instance1.name = 'Me';
instance1.friends.push('Haiku');
console.log(person.name);
console.log(person.friends);

var instance2 = extend(person);
instance2.friends.push('You');
console.log(person.friends);
