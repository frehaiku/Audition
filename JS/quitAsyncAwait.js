/**
 * Created by 海枯 on 2017/10/14.
 */
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('111')
    }, ms);
  })
}

async function asyncPrint(value, ms) {
  var param = await timeout(ms);
  console.log(param)
  console.log(value);
  // throw new Error('出错了')
}

/*asyncPrint('hello world', 1000)
 .then(v => console.log(v))
 .catch(v => console.log(v))*/

async function f() {
  return await 123;
}
// f().then(v => console.log(v))

async function parallelFunc() {
  var fns = [
    setTimeout(() => console.log('1000 ms after'), 1000),
    setTimeout(() => console.log('2000 ms after'), 2000),
    setTimeout(() => console.log('3000 ms after'), 3000),
  ]
  fns.forEach(async function (item, idx) {
    await item()
  })
}
// parallelFunc()

async function dependFunc0() {
  var fns = [
    setTimeout(() => console.log('1000 ms after'), 1000),
    setTimeout(() => console.log('2000 ms after'), 2000),
    setTimeout(() => console.log('3000 ms after'), 3000),
  ]
  for (let fn of fns) {
    await fn
  }
}
// dependFunc0()

async function dependFunc1() {
  var seconds = [1000, 2000, 3000]

  function afterRun(ms) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(`after ${ms} seconds`)
        resolve(ms)
      }, ms)
    })
  }

  for (let sec of seconds)
    await afterRun(sec)

}
// dependFunc1()

/*Promise.resolve(1)
 .catch(reject => {
 console.log(reject)
 })
 .then(resolve => {
 // throw new Error('发送错误')
 console.log(resolve)
 return 2
 })
 .then(resolve => {
 console.log(resolve)
 return 3
 })*/

/*var bb = 1
 function aa(bb) {
 bb = 2
 console.log(bb)
 }
 aa(bb)
 console.log(bb)*/

/*var sangfor = NaN
 function sangfor() {}

 if (typeof sangfor === 'number')
 console.log(100)
 else if (typeof sangfor === 'function')
 console.log(200)
 else if (typeof sangfor === 'object')
 console.log(300)
 else
 console.log(400)*/

/*let x = {
 toString () {
 return 20
 },
 valueOf () {
 return '30'
 }
 }

 console.log(x == '20')
 console.log(x == 30)
 */

/*
 function load() {
 return Promise.resolve('sangfor')
 .then(result => {
 throw result
 })
 .catch(result => 'error')
 }
 async function fn() {
 console.log(await load())
 }
 fn()*/
/*Promise.resolve('sangfor')
 .then(result => {
 throw result
 })
 .catch(console.error)
 .then(console.log)*/

/*
 ;(function () {
 for (var i = 0; i < 5;i++)
 setTimeout(console.log, i, i)
 }())*/

function findReverse(num, once, arr) {
  arr = arr.map(e => +e)
  num = num - 1
  var min = Math.min.apply(null, arr)
  if (min == 0) {
    console.log(arr.join(' '))
  } else {
    var idx = arr.indexOf(min)
    var i = num
    var ans = 0
    while (1) {
      if (i != idx) {
        ans++
        arr[i]--
      } else {
        if (arr[i] > 0) {
          ans++
          arr[i]--
        } else {
          break
        }
      }
      if (i - 1 < 0)
        i = once
      i--;
    }
    arr[idx] += ans
    console.log(arr.join(' '))
  }
}
findReverse(2, 3, ['6', '1', '1'])