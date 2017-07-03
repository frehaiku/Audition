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

// 读取多个文件成功的回调
Promise.all([filePromise1, filePromise2])
.then(values => {
    console.log(JSON.parse(values[0]))
    console.log(JSON.parse(values[1]))
})