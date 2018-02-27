/**
 * Created by 海枯 on 2018/2/27.
 */
function MiddleWare() {
  this.storge = []
  // 缓存传入参数
  this.options = null
}

MiddleWare.prototype.use = function (fn) {
  if (typeof fn != 'function')
    throw 'use Function first argument must be function'
  this.storge.push(fn)
  return this
}

MiddleWare.prototype.next = function () {
  if (this.storge[0] != null) {
    let excute = this.storge.shift()
    excute.call(this, this.options, this.next.bind(this))
  }
}

MiddleWare.prototype.handleRequest = function (opt) {
  this.options = opt
  this.next()
}

let middleware = new MiddleWare()

function validate(opts, next) {
  if (true)
    console.log('通过验证', opts.data)
  next()
}

function send(opts, next) {
  setTimeout(() => {
    console.log('send', opts.data)
    opts.url = 'http://www.baidu.com'
    next()
  }, 100)
}

function goTo(opts) {
  console.log('goTo', opts.url)
}

middleware.use(validate).use(send).use(goTo)
middleware.handleRequest({data: {name: 'xuzhipeng', age: 20}})