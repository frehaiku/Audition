/**
 * Created by 海枯 on 2017/7/12.
 * 实现一个函数，可以给一个对象绑定函数，
 * 当对象任意属性发生变化的时候，可以执行绑定的函数。
 * 可以对同一个对象绑定多个函数。
 * 函数中的this指向this指向的第一个参数即绑定的对象
 */
;(function () {
  const structor = function(obj) {
    for (let item in obj)
      if (obj.hasOwnProperty(item))
        convert.call(obj, item, obj[item])
  }

  const convert = function(key, val) {
    Object.defineProperty(this, key, {
      configurable: true,
      enumerable: true,
      get () {
        return val
      },
      set (newValue) {
        if (newValue === val) return
        val = newValue
        dumpGoal(this)
      }
    })
  }

  const dumpGoal = obj => {
    for (let i = 0; i < queues[obj].length; i++)
      queues[obj][i].call(obj)
  }

  let person = {
    name: 'aa',
    age: 11,
    title: '碉堡'
  }
  let queues = {}

  const bind = (object, callback) => {
    structor(object)
    if (!(object in queues)) {
      queues[object] = []
    }
    queues[object].push(callback)
  }

  bind(person, function () {
    console.log(`输出name: ${this.name}`)
  })
  bind(person, function () {
    console.log(`输出age: ${this.age}`)
  })

  person.name = '名字'

  person.age = 18;
})();