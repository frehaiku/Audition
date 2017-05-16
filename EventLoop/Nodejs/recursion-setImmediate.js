var start = new Date()
setImmediate(function () {
    console.log('immediate')
})
setTimeout(function () {
    console.log('timeout')
}, 500)

process.nextTick(function () {
    var end = new Date
    console.log('nextick')
})
while (new Date - start < 500) {}

// nexttick
// timeout
// immediate

setImmediate(function () {
    console.log(1);
}, 0);

setTimeout(function () {
    console.log(2);
}, 0);

new Promise(function (resolve) {
    console.log(3);
    resolve();
    console.log(4);
}).then(function () {
    console.log(5);
});

console.log(6);

process.nextTick(function () {
    console.log(7);
});

console.log(8);

//输出结果是3 4 6 8 7 5 2 1