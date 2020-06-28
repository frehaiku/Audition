/**
 * 观察者模式
 */
function EventEmit() {
  this._queues = {}
}

EventEmit.prototype.on = function (name, fn, context) {
  if (fn) {
    let handlers = this._queues[name] || (this._queues[name] = [])
    handlers.push({fn, context})
  }
  return this
}

EventEmit.prototype.off = function (name, fn, context) {
  if (!name && !fn && !context)
    this._queues = null

  if (name && !fn && !context)
    delete this._queues[name]
  else {
    let remain = []
    let handlers = this._queues[name]
    let i
    let length = handlers.length
    let item
    for (i = 0; i < length; i++) {
      item = handlers[i]
      if (
        (!context && item.fn !== fn) ||
        (context && item.fn !== fn && item.context != context)
      )
        remain.push(item)
    }
    this._queues[name] = remain
  }
  return this
}

EventEmit.prototype.emit = function (name, ...args) {
  let emitThing = this._queues[name]
  let i
  let length = emitThing.length
  for (i = 0; i < length; i++)
    emitThing[i].fn.apply(emitThing[i].context, args)
  return this
}

// example
let evtEmit = new EventEmit()

function doAny0() {
  console.log('The 0 sequence is running')
}

function doAny1() {
  console.log('The 1 sequence is running')
}

function doAny2() {
  console.log('The 2 sequence is running')
}

/*
const KEY = 'test'
evtEmit.on(KEY, doAny0)
  .on(KEY, doAny1)
  .on(KEY, doAny2)

evtEmit.emit(KEY)

evtEmit.off(KEY, doAny1)

evtEmit.emit(KEY)*/

function clone(sources) {
  var tar
  if (sources instanceof Array) {
    tar = []
    sources.forEach((item, idx) => {
      tar[idx] = clone(sources[idx])
    })
    return tar
  } else if (Object.prototype.toString.call(sources) == '[object Object]') {
    tar = {}
    for (var item in sources)
      tar[item] = clone(sources[item])
    return tar
  } else
    return sources
}
var obj1 = {name: 'xuzhipeng', sex: 'boy', fn: function () {
  console.log(1)
}}

var after = clone(obj1)
after.name = 'frehaiku'
console.log(obj1)
console.log(after)