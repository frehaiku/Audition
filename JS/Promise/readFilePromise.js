const fs = require('fs')
const path = require('path')
const readFilePromise = function (fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, (err, data) => {
            // 异常捕获
            if (err) {
                reject(err)
            } else {
                resolve(data.toString())
            }
        })
    })
}

const fullFileName = path.resolve(__dirname, './data/data1.json')
const fullNamedata2 = path.resolve(__dirname, './data/data2.json')

const result = readFilePromise(fullFileName)
const result2 = readFilePromise(fullNamedata2)

// 串联多个异步操作
// 如果前面的步骤返回值是一个Promise对象的话，
// 后面的then将会被当做这个返回的Promise的第一个then来对待
result2
// 参数中接受的参数是resolve传递的内容
    .then(data => {
        console.log(data)
        return result
    })
    .then(data => {
        console.log(data)
        return JSON.parse(data).a
    })
    // 如果then有多层操作，那么前面步骤return的值会被当做参数传递到后面步骤的函数
    .then(data => {
        console.log(data)
    })

    // then接受两个参数，第一个参数会在执行resolve之后触发（还能传递参数）
    // 第二个参数会在执行reject之后触发，但是不建议这样使用,因为会产生一新的“分支”
    // 一般要采用最后一个.catch捕获异常
    .catch(err => {
        console.log(err.stack)
    })