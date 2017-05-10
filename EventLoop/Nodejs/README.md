# Node.js中的Event Loop

Node.js的运行机制不同于浏览器环境。

Node.js的运行机制如下。

1. V8引擎解析JavaScript脚本
2. 解析后的代码，调用Node API
3. libuv库负责Node API的执行。它将不同的任务分配给不同进程，形成一个Event Loop，以异步的方式将任务的执行结果返回给V8引擎
4. V8引擎将结果返回给用户

`process.nextTick`方法可以在当前“执行栈”的尾部---下一次Event Loop（主线程读取任务队列）之前触发回调函数

```js
process.nextTick(() => {
    console.log(1)
    process.nextTick(() => console.log(2))
})

setTimeout(() => console.log(3))
```

上述代码中，由于`process.nextTick`方法指定的回调函数，总是在当前“执行栈”的尾部触发，所以不仅函数nextTick比`setTimeout`指定的回调函数先执行，而且“嵌套的内部函数”也比timeout先执行。这说明，如果有多个`process.nextTick`语句，将全部在当前执行栈执行。

而setImmediate方法则是当前"任务队列"的尾部添加事件，也就是说，它指定的任务总是在下一次Event Loop时执行，这与setTimeout()很像。

```js
setImmediate(function () {
    console.log(1)
    setImmediate(function () {
        console.log(2)
    })
})

setTimeout(function () {
    console.log('TIMEOUT FIRED')
})
```

上述代码中，setImmediate与setTimeout各自添加了一个回调函数A和timeout，都是在下一次Event Loop触发。那么哪个先执行呢，答案是不确定的。
运行结果有可能输出`1---TIMEOUT FIRED---2`或`TIMEOUT FIRED---1---2`

Node.js文档称，在setImmediate指定的回调函数中，总是排在setTimeout的前面。实际上，这种情况只发生在递归调用的时候。

```js
setImmediate(function () {
    setImmediate(function A() {
        console.log(1)
        setImmediate(function B() {
            console.log(2)
        })
    })

    setTimeout(function timeout() {
        console.log('TIMEOUT FIRED')
    }, 0)
})

// 1
// TIMEOUT FIRED
// 2
```

可以看出setImmediate总是将事件注册到下一轮Event Loop，所以函数B在下一轮Loop执行。

由此看到nextTick与Immediate的一个区别，多个nextTick总是在当期执行栈一次执行完。多个setImmediate可能则需要多次loop才能执行完。