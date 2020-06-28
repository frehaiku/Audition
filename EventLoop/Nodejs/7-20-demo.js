/**
 * Created by 海枯 on 2019/7/20.
 */
setTimeout(() => {
  console.log('timer1');
  Promise.resolve().then(function () {
    console.log('promise1')
  })
}, 0)

setTimeout(() => {
  console.log('timer2')
  Promise.resolve().then(function () {
    console.log('promise2')
  })
}, 0)

/*
* Node里执行顺序：
* timer1
* timer2
* promise1
* promise2
* */

/*
class Test {};
global.test = new Test()

function run5(bigData) {
  const innerData = new Buffer(100);
  // 被闭包引用，创建一个 context: context1。
  // context1 引用 bigData，innerData。
  // closure 为 function run5()
  // run5函数没有 context，所以 context1 没有previous。
  // 在 run5中新建的函数将绑定上 context1。
​
  test.outClosure5 = function () {
    // 此函数闭包 context 指向 context1。
    void bigData;
    const closureData = new Buffer(100);
    // 被闭包使用，创建 context: context2。
    // outClosure5 函数有 context1，previous 指向 context1。
    // 在 outClosure5 中新建的函数将绑定上context2。
  ​
    test.innerClosure5 = function () {
      // 此函数闭包 context 指向 context2。
      void innerData;
    }
    test.innerClosure5_1 = function () {
      // 此函数闭包 context 指向 context2。
      void closureData;
    }
  };
  test.outClosure5_1 = function () {}
  test.outClosure5();
}

​
run5(new Buffer(1000));*/
