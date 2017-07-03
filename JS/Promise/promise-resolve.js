// Promise.resolve(value) 方法返回一个以给定值后的Promise对象。
// 如果这个值是thenable（即一个对象带有then方法），返回的promise会跟随这个thenable对象

Promise.resolve({
    then (resolve, reject) {
        resolve(200)
    }
})
.then(data => {
    console.log(data)
})