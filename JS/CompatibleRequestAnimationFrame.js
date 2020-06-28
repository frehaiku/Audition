/**
 * Created by 海枯 on 2017/8/17.
 */
let lastTime = 0
var vendor = ['wekbit', 'moz']

for (let i = 0; !(global.requestAnimationFrame) && i < vendor.length; i++) {
  global.requestAnimationFrame = `${vendor[i]}RequestAnimationFrame`
  global.cancelAnimationFrame = `${vendor[i]}CancelAnimationFrame`
}

if (1) {
  global.requestAnimationFrameCustomed = function (callback) {
    let currTime = Date.now()
    let timeToCall = Math.max(0, 16.7 - (currTime - lastTime))
    console.log(`timetoCall:${timeToCall}`)
    let id = global.setTimeout(() => {
      callback(currTime + timeToCall)
    }, timeToCall)
    lastTime = currTime + timeToCall
    return id
  }
}

if (!global.cancelAnimationFrame) {
  global.cancelAnimationFrame = clearTimeout
}

for (let i = 0; i < 5; i++)
  setTimeout(timeoutCb, 1000 * i)

function timeoutCb() {
  requestAnimationFrameCustomed(print)
}

function print(str) {
  console.log(str)
}