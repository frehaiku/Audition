/**
 * Created by 海枯 on 2017/9/21.
 */
/*var promise = (function () {

 class MyPromise {
 state = 'pending' // pending || resolve || reject
 retData
 resolveCallbacks = []

 constructor(executor) {
 var self = this
 try {
 executor(resolve)
 } catch (e) {
 reject(e)
 }

 function resolve(value) {
 if (state == 'pending') {
 let i
 for (i = 0; i < self.resolveCallbacks.length; i++)
 setTimeout(()=> {
 self.resolveCallbacks[i](value)
 }, 0)
 }
 }

 }

 then(onResolve, onReject) {
 if (this.state == 'pending') {
 return new MyPromise((resolve, reject) => {
 this.resolveCallbacks.push(function (value) {
 try {
 x = onResolve(value)
 resolve(x)
 } catch (e) {
 reject(e)
 }
 })

 })
 }
 }
 }

 return MyPromise
 })()

 function getUserId() {
 return new promise(function (resolve) {
 resolve(9876);
 });
 }

 function getUserJobById(id) {
 return new promise(function (resolve) {
 resolve(`from getUserJobById ${id}`);
 });
 }*/

/*
 getUserId()
 .then(getUserJobById)
 .then(function (job) {
 console.log(job)
 });*/

function newClass(...args) {
  var obj = {}
  var constructors = args[0]
  obj.__proto__ = constructors.prototype
  constructors.apply(obj, args.slice(1))
  return obj
}

function Person(name, age) {
  this.name = name
  this.age = age
}
var instance1 = newClass(Person, 'freHk', 21)
// console.log(instance1)

function base() {
  this.name = 'aaa'
  this.age = 21
}

function child() {
  this.sex = 'man'
}

function inherit(base, child) {
  var f = function () {
    child.call(this)
    base.call(this)
  }
  f.prototype = Object.assign(child.prototype, base.prototype)
  return new f()
}

function inherit1(base, child) {
  base.call(this)
  child.call(this)
}
inherit1.prototype = new base()
instance1.prototype = new child()

/*console.log(inherit(base, child))

 function toBinary(a, b, c) {
 var computed = Math.pow(2, a) + Math.pow(2, b) - Math.pow(2, c)
 var arr = [], rest
 var ans = 0
 while (computed >= 1) {
 rest = computed % 2;
 (rest != 0) && (ans++)
 arr.push(rest)
 computed = ~~(computed / 2)
 }
 console.log(arr.reverse().join(''))
 console.log(ans)
 }
 toBinary(3, 2, 1)*/

/*
 function toAnyBinary(computed, radix) {
 var arr = [], rest
 var ans = 0
 while (computed >= 1) {
 rest = computed % radix;
 // (rest != 0) && (ans++)
 ans += rest
 arr.push(rest)
 computed = ~~(computed / radix)
 }
 return ans
 }

 function maxQuan(num) {
 var max = 0
 var i
 for (i = 2; i <= num; i++) {
 var ret = toAnyBinary(num, i)
 if (ret > max)
 max = ret
 }
 console.log(max)
 }
 maxQuan(57)*/

function wipeCIDR(arr) {
  arr = arr.map(item => {
    let wipeT = item.split('/')
    let arrJu = wipeT[0].split('.')
    return toAnyBinary(+arrJu[0], 2) + '.'
      + toAnyBinary(+arrJu[1], 2) + '.'
      + toAnyBinary(+arrJu[2], 2) + '.'
      + toAnyBinary(+arrJu[3], 2)
      + '/'
      + wipeT[1]
  })
  arr.sort()
  console.log(arr)
  var wipe = []
  var i, j, length = arr.length
  var item, binary, innerBinary
  for (i = 0; i < length; i++) {
    item = arr[i]
    binary = item.match(/\/(\d+)/)[1]
    var provit = item.slice(0, binary)
    for (j = i + 1; j < length; j++) {
      var innerItem = arr[j]
      innerBinary = innerItem.match(/\/(\d+)/)[1]
      var innerProvit = item.slice(0, innerBinary)
      var isMatch = -1
      if (provit >= innerBinary)
        isMatch = provit.indexOf(innerBinary)
      else
        isMatch = innerBinary.indexOf(provit)
      isMatch !== -1 && wipe.push(j)
    }
    // for (var k = 0; k < wipe.length; k++)

  }
}
wipeCIDR([
  "192.168.0.0/16",
  "172.24.96.17/32",
  "172.50.137.225/32",
  "202.139.219.192/32",
  "172.24.68.0/24",
  "192.183.125.71/32",
  "201.45.111.138/32",
  "192.168.59.211/32",
  "192.168.26.13/32",
  "172.24.0.0/17",
  "172.24.5.1/32",
  "172.24.68.37/32",
  "172.24.168.32/32"])

function toAnyBinary(computed, radix) {
  var arr = [], rest
  // var ans = 0
  while (computed >= 1) {
    rest = computed % radix;
    // (rest != 0) && (ans++)
    // ans += rest
    arr.push(rest)
    computed = ~~(computed / radix)
  }
  // 补0
  var any = 8 - arr.length
  var ans = arr
  for (var i = any; i > 0; i--)
    ans.push('0')
  return ans.reverse().join('') || 0
}
// console.log(toAnyBinary(11, 2))

function findVersion(arr, goal) {
  var reg = new RegExp(goal)
  var relevant = []
  arr.forEach(function (item) {
    if (reg.test(item))
      relevant.push(item)
  })
  relevant.sort()
  console.log(relevant.length == 0 ? 'error' : relevant[relevant.length - 1])
}
// findVersion(['2.1.4', '2.5.7', '3.4.6', '2.1.8', '2.1.0'], '2.*.*')

function templateCompile(str, goal) {
  var keys = Object.keys(goal)
  var i, key, item
  for (i = 0; i < keys.length; i++) {
    key = keys[i]
    item = goal[key]
    str = str.replace(new RegExp('{{([^\\/]*)(' + key + ')}}', 'g'), function (m, p1, p2) {
      // console.log(m)
      // console.log(p1)
      // console.log(p2)
      return goal[p2]
    })
  }
  console.log(str)
}
// templateCompile('<h1>Welcome {{name}}</h1>', {"name": "Qunar-Man"})

function main(input) {
  var d = ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps']
  var len = input.length

  var idx = Math.floor(len / 3)
  idx = idx > 4 ? 4 : idx
  var ans = (+input / Math.pow(1000, idx)).toFixed(2)
  console.log((ans == +ans ? +ans : ans) + ' ' + d[idx])
}
// main("1234567")
// main("9876543210")
// main("987654321000000000000")

function merge(arr) {
  var ans = {}
  arr.sort()
  arr.forEach(function (item, idx) {
    if (item.indexOf('-') != -1) {
      var arr = item.split('-')
      var s = +arr[0], e = +arr[1]
    }
  })
  console.log(arr)
}

function findIn() {

}
// merge(['6553','1-655','5-1010','1011','1012'])
var arr3 = "0,0,0,0,1;1,1,1,0,1;1,1,1,0,0".split(';')
var m = arr3.length - 1
var n
var total = []
arr3.forEach(item => {
  n || (n = item.split(',').length - 1)
  total.push(item.split(','))
})
console.log(total)
console.log(m)
console.log(n)
function main3(arr, m, n, x, y) {
  // if (x == 0)
}
main3(total, m, n, 0, 0)