function isArray(obj) {
  return Array.isArray ? Array.isArray(obj) : Object.prototype.toString.call(obj) === '[object Array]'
}
function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
function diff (c1, c2) {
  let type1 = typeof c1
  let type2 = typeof c2
  if (type1 !== type2)
    return false;
  else if(isObject(c1) && isObject(c2)) {
    let k1Len = Object.keys(c1).length
    let k2Len = Object.keys(c2).length
    if (k1Len != k2Len)
      return false
    else {
      for (let item in c1)
        if (c1.hasOwnProperty(item))
          if (!isObject(c1[item]) && !isObject(c2[item]))
            return c1[item] === c2[item]
          else if (!diff(c1[item], c2[item]))
            return false
      return true
    }
  } else if (isArray(c1) && isArray(c2)) {
    if (c1.length != c2.length)
      return false
    return c1.every((e, idx) => diff(c1[idx], c2[idx]))
  } else {
    return true
  }
}

console.log(diff(1,1)) // true
console.log(diff(1,'1')) // false
console.log(diff({name: 'cvte'},{name:'cvte'}))// true
console.log(diff({name: 'cvte'},{name:'seewo'})) //false