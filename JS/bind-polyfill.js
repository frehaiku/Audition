Function.prototype.selfBind = function (oThis) {
    var args = [].slice.call(arguments, 1),
        fnThs = this;

    return function () {
        fnThs.apply(oThis, args.concat(Array.prototype.slice.call(arguments)))
    }
};

var a = {age: 18, getAge: function () {
    console.log([].slice.call(arguments).reduce(function (a, b) {
        return a + b;
    }))
}}


var b = {age: 20}

a.getAge.selfBind(b, 18)(20);