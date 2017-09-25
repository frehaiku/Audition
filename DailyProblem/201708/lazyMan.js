/**
 * Created by 海枯 on 2017/9/20.
 */
var LazyMan = (function () {
  class LazyMan {

    constructor(name) {
      this.queue = []
      this.push(() => {
        console.log(`welcome ${name}`)
        this.queue.shift()
        this.next()
      })

      setTimeout(() => {
        this.next()
      }, 0)
    }

    push(fn) {
      this.queue.push(fn)
    }

    next() {
      if (this.queue.length != 0) {
        this.queue[0].call()
      }
    }

    eat(food) {
      this.push(() => {
        console.log(`eat ${food}`)
        this.queue.shift()
        this.next()
      })
      return this
    }

    sleep(seconds) {
      this.push(() => {
        setTimeout(() => {
          console.log(`wake up after ${seconds}s`)
          this.queue.shift()
          this.next()
        }, 1000 * seconds)
      })
      return this
    }

    sleepFirst(seconds) {
      this.queue.unshift(() => {
        setTimeout(() => {
          console.log(`wake up first after ${seconds}s`)
          this.queue.shift()
          this.next()
        }, 1000 * seconds)
      })
      return this
    }
  }
  return function (name) {
    return new LazyMan(name)
  }
})()

LazyMan("Hank").sleep(1).eat("dinner").sleepFirst(3)