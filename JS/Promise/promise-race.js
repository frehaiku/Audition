const fs = require('fs')
const path = require('path')

const readFilePromise = function (fileName) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

const filePath1 = path.resolve(__dirname, './data/data1.json')
const filePath2 = path.resolve(__dirname, './data/data2.json')

const filePromise1 = readFilePromise(filePath1)
const filePromise2 = readFilePromise(filePath2)

// race的含义与all相反，只要其中一个满足条件则执行
Promise.race([filePromise1, filePromise2])
.then(datas => {
    console.log(JSON.parse(datas))
})

// race的setTimeout示例
var p1 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 500, 'one')
})

var p2 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 100, 'two')
})

// 输出two，因为两个都完成，但是p2更快
Promise.race([p1, p2])
.then(function (value) {
    console.log(value)
})


var p3 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 100, 'three')
})

var p4 = new Promise(function (resolve, reject) {
    setTimeout(reject, 500, 'four')
})
// p3更快，所以它完成了
Promise.race([p3, p4])
.then(function (value) {
    console.log(value)
}, function (reason) {
    
})


var p5 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 500, 'five')
})

var p6 = new Promise(function (resolve, reject) {
    setTimeout(reject, 100, 'six')
})
// p6时间更短，所以它能被reject接收到
Promise.race([p5, p6])
.then(function (value) {
    console.log(value)
}, function (reason) {
    console.log(reason)
})