/**
 * Created by 海枯 on 2018/3/19.
 */
// n个接口，计算出花费最小时间的接口

let urls = ['./a', './b', './c', './d']

let promises = urls.map((e, idx) => {
  return new Promise((resolve, reject) => {
    // throw new Error('happening error')

    const ago = +new Date()
    setTimeout(() => {
      /*if (idx == 2)
        throw new Error('happening error')
      */console.log(e)
      resolve(+new Date - ago)
    }, idx * 1000)
  }).catch(e => {
    console.log(e)
  })
})

Promise.all(promises).then((res) => {
  console.log(res)
})