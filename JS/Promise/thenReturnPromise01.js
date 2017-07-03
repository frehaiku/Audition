/**
 * 使用Promise实现调用完数组的全部元素之后，打印信息
 * Created by 海枯 on 2017/7/3.
 */
var arr = [1, 2, 3, 4]
var promises = arr.map(
  ele => new Promise(
    (resolve, reject) =>
      setTimeout(() => {
        console.log(`${ele}s later.`)
        // 注意：如果这里reject不注释掉
        // 1. promise状态不会再改成resolve，因为promise的状态是不可逆的，只能从Pending变为resolved，或者从Pending变为Rejected
        // 2. reject之后会马上执行catch回调，但是！！！后面的promise依然会顺序执行

        // reject(ele)
        resolve(ele)
      }, ele * 1000)
  )
)

Promise.resolve(arr)
  .then(arr => Promise.all(promises))
  .then(promiseArrs => console.log('all promise excute complete!'))
  .catch(e => console.log('a error happen!'))