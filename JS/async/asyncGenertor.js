function asyncToGenerator(g) {
  return function () {
    var gen = g.apply(null, arguments)
    return new Promise((resolve, reject) => {
      function step(ret) {
        var { value, done } = gen.next(ret)
        if (done) return Promise.resolve(value)

        return Promise
          .resolve(value)
          .then(step)
          .catch(err => {
            return gen.throw(err)
          })
      }

      try {
        resolve(step())
      } catch (e) {
        reject(e)
      }
    })
  }
}

function getDate() {
  return new Promise(r =>
    setTimeout(() => {
      r(Date.now())
    }, 1000)
  )
}

// example start
function* testG() {
	var data1 = yield getDate()
	console.log(data1)
  //throw new Error('reject sth')
	var data2 = yield getDate()
	console.log(data2)

	return 'success'
}

var asyncFn = asyncToGenerator(testG)
asyncFn().then(console.log).catch(console.warn)

// async call exmpale
// async function testAsync() {
//   var data1 = await getDate()
// 	console.log(data1)

// 	var data2 = await getDate()
// 	console.log(data2)

// 	return 'success'
// }
// testAsync().then(console.log)