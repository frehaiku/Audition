/**
 * Created by frehaiku on 2017/5/17.
 */
var pipe = (function () {
    return value => {
        var funcStack = []
        var oproxy = new Proxy({}, {
            get (pipeObject, fnName) {
                if (fnName == 'get') {
                    return funcStack.reduce((val, fn) => {
                        return fn(val)
                    }, value)
                }
                funcStack.push(global[fnName])
                return oproxy
            }
        })

        return oproxy
    }
})()

var double = n => n * 2
var pow = n => n * n
var reverseInt = n => n.toString().split("").reverse().join("") | 0

pipe(3).double.pow.reverseInt.get