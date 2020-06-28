/**
 * Created by 海枯 on 2018/3/16.
 */
function InversePairs(data) {
  // write code here
  var len = data.length
  if (len < 1)
    return 0
  var res = mergeSortion(data, 0, len - 1)
  // console.log(data)
  return res % 1000000007
}

function mergeSortion(arr, l, r) {
  if (l >= r)
    return 0;
  var mid = (r + l) >> 1
  var lc = mergeSortion(arr, l, mid)
  var rc = mergeSortion(arr, mid + 1, r)
  return lc + rc + __merge(arr, l, mid, r)
}

function __merge(arr, l, mid, r) {
  var twice = new Array(r - l + 1)
  var ans = 0, idx = r - l
  var i = mid, j = r
  while (i >= l && j >= mid + 1) {
    if (arr[i] > arr[j]) {
      twice[idx--] = arr[i--]
      ans += j - mid
    } else
      twice[idx--] = arr[j--]
  }
  // 最后一个数
  for (; i >= l; i--)
    twice[idx--] = arr[i]
  for (; j >= mid + 1; j--)
    twice[idx--] = arr[j]
  // 重排数组
  for (var z = 0; z < twice.length; z++)
    arr[l + z] = twice[z];
  return ans
}
console.log(InversePairs([1, 2, 3, 4, 5, 6, 7, 0]))
// console.log(__merge([1,2,3,4,5,6,7,0],0,1,3))

// 思路是先把所有的数异或得到一个两个数的异或值，求这个值从右边数起的第1个1
// 根据元素的第i个数是否为1，做数组的划分，分成两个数组
function FindNumsAppearOnce(arr) {
  // write code here
  // return list, 比如[a,b]，其中ab是出现一次的两个数字
  var len = arr.length
  var total = arr[0]
  for (var i = 1; i < len; i++)
    total ^= arr[i]
  var splitIdx = whatBitIs1(total)
  var ans1 = 0, ans2 = 0

  for (var j = 0; j < len; j++) {
    if (isBitIs1(arr[j], splitIdx))
      ans1 ^= arr[j];
    else
      ans2 ^= arr[j]
  }
  return [ans1, ans2]
}
// 判断第N位是否是1
function isBitIs1(num, whatBit) {
  return (num >> whatBit) & 1
}
// 从右边数起第几位是1
function whatBitIs1(num) {
  var bit = 0
  while ((num & 1) == 0) {
    num = num >> 1
    bit++
  }
  return bit
}
// console.log(FindNumsAppearOnce([2,4,3,6,3,2,5,5]))

function LastRemaining_Solution(n, m) {
  // write code here
  var arr = new Array(n)
  for (var i = 0; i < n; i++)
    arr[i] = i;
  var i = 0
  m = m - 1
  var len
  while ((len = arr.length) > 1) {
    var next = i + m
    var del = next < len ? next
      : (next % len)
    i = del
    arr.splice(del, 1)
  }
  return arr[0]
}
console.log(LastRemaining_Solution(5, 3))


function divide(big, small) {
  var rate = small / big
  if (rate <= 0.3)
    return 5
  else if (rate <= 0.6)
    return 4
  else
    return 3
}

/*
 var totalstr = 'math 100 90,algorithm 10 8,string 50 1,dp 100 50'
 var totalArr = totalstr.split(',')

 var j = 4
 var acc = j
 var arr = []
 var obj = {}
 while (j--) {
 var str = totalArr[j]
 // console.log(str)
 str = str.split(' ')
 var name = str[0], big = +str[1], small = +str[2]
 obj[name] = divide(big, small)
 arr.push(name)
 }

 arr.sort()
 var i = 0
 for (; i < acc; i++)
 console.log(`${arr[i]} ${obj[arr[i]]}`)*/


/*function multiply(arr)
 {
 // write code here
 var len = arr.length
 if (len == 0)
 return []
 var ans = new Array(len)
 ans[0] = 1
 var i

 for (i = 1; i < len; i++) {
 ans[i] = arr[i-1] * ans[i-1]
 }
 var tmp = 1
 for (i = len-2;i >= 0;i--) {
 tmp *= arr[i+1]
 ans[i] *= tmp
 }
 return ans
 }
 console.log(multiply([3,5,7,9]))*/

function flattenDeep(arr) {
  var ret = []
  arr.forEach((e) => {
    if (e instanceof Array) {
      var inner = flattenDeep(e)
      ret.push(...inner)
    }
    else
      ret.push(e)
  })
  return ret
}
const deepFlatten = arr => [].concat(
  ...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v))
);
// console.log(flattenDeep([1, [2, [3, [4]]], 5]))
// console.log(deepFlatten([1, [2, [3, [4]]], 5]))

function groupby(collection, functions) {
  if (Array.isArray(collection)) {
    var ans = {}
    collection.forEach((e) => {
      var key
      if (typeof functions === 'string')
        key = e[functions]
      else
        key = functions.call(null, e)

      if (key in ans)
        ans[key].push(e)
      else
        ans[key] = [e]
    })

    return ans
  } else
    return false

}


const groupByPerfect = (connection, fn) =>
  connection.map(typeof fn == 'string' ? ele => ele[fn] : fn)
    .reduce((acc, cur, idx) => {
      acc[cur] = (acc[cur] || []).concat(connection[idx])
      return acc
    }, {})
// console.log(groupByPerfect([6.1, 4.2, 6.3], Math.floor))
// console.log(groupByPerfect(['one', 'two', 'three'], 'length'))

const deepCopyObject = (ret, obj) => {
  const isObject = (o) => Object.prototype.toString.call(o) == "[Object object]"
  for (let key in obj) {
    if (!(Array.isArray(obj[key])) || isObject(obj[key]))
      ret[key] = obj[key]
    else {
      if (Array.isArray(obj[key]))
        ret[key] = []
      else
        ret[key] = {}
      deepCopyObject(ret[key], obj[key])
    }
  }
  return ret
}

// test
let source = {
  a: {b: 2},
  c: [1, 5, 8],
  d: '123str',
  e: 123
}, target = {}

// deepCopyObject(target, source)
function cloneObj(obj) {
  let newObj = obj instanceof Array ? [] : {}
  for (let i in obj) {
    newObj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i]
  }
  return newObj
}
// target = cloneObj(source)
// target.c.push(9)
//
// console.log(target)
// console.log(target.c[2])
// console.log(source)

function match(s, pattern) {
  return _match(s, 0, pattern, 0)
}

function _match(s, i, pattern, j) {
  var slen = s.length, plen = pattern.length
  if (i == slen && j == plen) {
    return true
  }
  if (i > slen || j > plen)
    return false

  if (pattern[j + 1] === "*")
    return _match(s, i + 1, pattern, j + 2)
      || _match(s, i + 1, pattern, j)
      || _match(s, i, pattern, j + 2)

  if (pattern[j] === "." || s[i] === pattern[j])
    return _match(s, i + 1, pattern, j + 1)

  return false
}
// console.log(match('aaa', 'ab*ac*a'))
// console.log(match("",".*"))
console.log('-------------')


function hasPath(matrix, rows, cols, path) {
  // 是否走过的格子的数组
  let fills = new Array(rows);
  fills = [...fills].map(e => new Array(cols).fill(false))

  let curx, cury
  let p = 0
  for (curx = 0; curx < rows; curx++)
    for (cury = 0; cury < cols; cury++)
      if (__hasPath(matrix, rows, cols, path, fills, curx, cury, p))
        return true
  return false
}
function __hasPath(matrix, rows, cols, path, fills, curx, cury, curp) {
  if (curp == path.length)
    return true
  if (cury == cols) {
    curx = curx + 1
    cury = 0
  }

  if (cury == -1) {
    curx = curx - 1
    cury = cols - 1
  }

  if (curx < 0 || curx >= rows)
    return false
  if (fills[curx][cury] || matrix[curx * cols + cury] != path[curp])
    return false

  fills[curx][cury] = true
  var ret = __hasPath(matrix, rows, cols, path, fills, curx - 1, cury, curp + 1)
    || __hasPath(matrix, rows, cols, path, fills, curx + 1, cury, curp + 1)
    || __hasPath(matrix, rows, cols, path, fills, curx, cury - 1, curp + 1)
    || __hasPath(matrix, rows, cols, path, fills, curx, cury + 1, curp + 1)

  fills[curx][cury] = false
  return ret
}
/*let recordx = -1, recordy = -1
 function __hasPath(px, py, fills, row, col, matrix, pp, path) {
 if (pp >= path.length)
 return true
 if (recordx != -1 && px == recordx && py == recordy)
 return false
 if (px >= row || py >= col || px < 0 || py < 0)
 return false
 console.log(px, py)
 if (fills[py][px] == 1)
 return false
 if (matrix[py][px] == path[pp]) {
 recordx = px
 recordy = py
 return true
 }

 let ret = __hasPath(px + 1, py, fills, row, col, matrix, pp, path)
 || __hasPath(px, py + 1, fills, row, col, matrix, pp, path)
 || __hasPath(px - 1, py, fills, row, col, matrix, pp, path)
 || __hasPath(px, py - 1, fills, row, col, matrix, pp, path)

 if (ret) {
 let copy = fills.slice()
 copy[recordx][recordy] = 1
 return __hasPath(px + 1, py, copy, row, col, matrix, pp + 1, path)
 || __hasPath(px, py + 1, copy, row, col, matrix, pp + 1, path)
 || __hasPath(px - 1, py, copy, row, col, matrix, pp + 1, path)
 || __hasPath(px, py - 1, copy, row, col, matrix, pp + 1, path)
 }
 else
 return false
 }*/

// console.log(hasPath("ABCESFCSADEE", 3, 4, "ABCCED"))


/*function movingCount(threshold, rows, cols) {
 // write code here
 if (threshold <= 0)
 return 0

 // 是否走过的格子的数组
 let fills = new Array(rows);
 fills = [...fills].map(e => new Array(cols).fill(false))
 return __movingCount(fills, threshold, rows, cols, 0, 0)
 }*/

function __movingCount(fills, threshold, rows, cols, curx, cury) {
  if (curx < 0 || cury < 0 || curx >= rows || cury >= cols)
    return 0
  // console.log(curx, cury)
  if (!fills[curx][cury] && computedDigitSum(curx) + computedDigitSum(cury) <= threshold) {
    fills[curx][cury] = true
    var ret = Math.max(
      __movingCount(fills, threshold, rows, cols, curx + 1, cury),
      __movingCount(fills, threshold, rows, cols, curx - 1, cury),
      __movingCount(fills, threshold, rows, cols, curx, cury + 1),
      __movingCount(fills, threshold, rows, cols, curx, cury - 1)
    )
    fills[curx][cury] = false
    return ret + 1
  }
  else
    return 0
}

function computedDigitSum(num) {
  if (num < 10)
    return num
  let remain = num
  let ans = 0
  while (remain > 0) {
    ans += remain % 10
    remain = Math.floor(remain / 10)
  }
  return ans
}

function movingCount(threshold, rows, cols) {
  // write code here
  if (threshold <= 0)
    return 0

  // 是否走过的格子的数组
  let fills = new Array(rows);
  fills = [...fills].map(e => new Array(cols).fill(false))
  return __movingCountPerfect(fills, threshold, rows, cols, 0, 0)
}

function __movingCountPerfect(fills, threshold, rows, cols, curx, cury) {
  if (curx < 0
    || cury < 0
    || curx >= rows
    || cury >= cols
    || fills[curx][cury]
    || computedDigitSum(curx) + computedDigitSum(cury) > threshold)
    return 0
  // console.log(curx, cury)
  fills[curx][cury] = true
  return __movingCountPerfect(fills, threshold, rows, cols, curx + 1, cury) +
    __movingCountPerfect(fills, threshold, rows, cols, curx - 1, cury) +
    __movingCountPerfect(fills, threshold, rows, cols, curx, cury + 1) +
    __movingCountPerfect(fills, threshold, rows, cols, curx, cury - 1) + 1
}
// console.log(movingCount(1, 2, 3))
// console.log(movingCount(111, 23, 53))

/*function maxInWindows(num, size) {
 if (size <= 0 || size > num.length)
 return []
 // write code here
 var max = buildMaxHeap(num.slice(), 0, size - 1)
 var i
 var length = num.length
 var ans = new Array(length - size + 1)
 ans[0] = max
 for (i = size; i < length; i++) {
 var newMax = buildMaxHeap(num.slice(i - size + 1, i+1), 0, size - 1)
 ans[i - size + 1] = newMax
 }
 return ans
 }*/

function buildMaxHeap(arr, l, r) {
  if (r <= l)
    return arr[l]
  // r = r % 2 ? r : (r - 1)
  var parent = (r % 2 ? r : (r - 1)) >> 1
  var lc = 2 * parent + 1, rc = 2 * parent + 2

  if (arr[lc] > arr[parent])
    swap(arr, lc, parent)
  // 当右边界包括右子树时，才比较右子树
  if (r >= rc && arr[rc] > arr[parent])
    swap(arr, rc, parent)

  return buildMaxHeap(arr, l, r - 2)
}
function swap(arr, l, r) {
  arr[l] = arr[l] + arr[r]
  arr[r] = arr[l] - arr[r]
  arr[l] = arr[l] - arr[r]
}


/*function maxInWindows(num, size) {
 var res = [];
 var s = [];
 for (var i = 0; i < num.length; ++i) {
 //从后面依次弹出队列中比当前num值小的元素，同时也能保证队列首元素为当前窗口最大值下标
 while (s.length && num[s[s.length - 1]] <= num[i])
 s.pop();
 //当当前窗口移出队首元素所在的位置，即队首元素坐标对应的num不在窗口中，需要弹出
 while (s.length && i - s[0] + 1 > size)
 s.shift();
 //把每次滑动的num下标加入队列
 s.push(i);
 //当滑动窗口首地址i大于等于size时才开始写入窗口最大值
 if (size && i + 1 >= size)
 res.push(num[s[0]]);
 }
 return res;
 }*/

function maxInWindows(num, size) {
  // write code here
  var length = num.length
  if (size <= 0 || size > length)
    return []
  // 存索引
  var queue = [],
    ans = []
  var i
  for (i = 0; i < length; i++) {
    while (queue.length && num[queue[queue.length - 1]] < num[i])
      queue.pop()
    while (queue.length && i - queue[0] >= size)
      queue.shift();
    queue.push(i)
    if (i >= size - 1)
      ans.push(num[queue[0]])
  }
  return ans
}
// [ 7, 9, 11, 13, 15 ]
// console.log(maxInWindows([1, 3, 5, 7, 9, 11, 13, 15], 4))
// [ 4, 4, 6, 6, 6, 5 ]
// console.log(maxInWindows([5, 3, 4, 2, 6, 2, 5, 1], 3))


function TreeNode(x) {
  this.val = x;
  this.left = null;
  this.right = null;
}

var root = new TreeNode(8)
root.left = new TreeNode(6)
root.right = new TreeNode(10)
root.left.left = new TreeNode(5)
root.left.right = new TreeNode(7)
root.right.left = new TreeNode(9)
root.right.right = new TreeNode(11)

function Prvar(root) {
  // write code here
  var ans = []
  if (root === null)
    return ans;

  var queue = [root]
  var toBePrvar = 1, nextLine = 0
  var inner = []
  while (queue.length > 0) {
    var front = queue[0]
    inner.push(front.val)
    if (front.left) queue.push(front.left)
    if (front.right) queue.push(front.right)
    toBePrvar--
    queue.shift()
    if (toBePrvar == 0) {
      nextLine = queue.length
      toBePrvar = nextLine
      ans.push(inner)
      inner = []
    }

  }
  return ans
}
// console.log(Prvar(root))

var minHeap = [], maxHeap = [], count = 0
function Insert(num) {
  count++
  // 两个堆长度相等时
  if (((minHeap.length + maxHeap.length) & 1) == 0) {
    if (maxHeap.length && num < maxHeap[0]) {
      maxHeap.push(num)
      buildHeap(maxHeap, 'max')
      num = maxHeap.shift()
    }
    minHeap.push(num)
    buildHeap(minHeap, 'min')
  } else {
    if (minHeap.length && num > minHeap[0]) {
      var min = minHeap.shift()
      minHeap.push(num)
      buildHeap(minHeap, 'min')
      num = min
    }
    maxHeap.push(num)
    buildHeap(maxHeap)
  }
}

function GetMedian() {
  // write code here
  if (count % 2 == 0)
    return (minHeap[0] + maxHeap[0]) / 2
  else
    return minHeap[0]
}

function buildHeap(arr, type = 'max') {
  function swap(arr, l, r) {
    arr[l] = arr[l] + arr[r]
    arr[r] = arr[l] - arr[r]
    arr[l] = arr[l] - arr[r]
  }

  var length = arr.length
  var parent = (length >> 1) - 1, lcIdx, rcIdx

  for (; parent >= 0; parent--) {
    lcIdx = 2 * parent + 1
    rcIdx = 2 * (parent + 1)
    if (
      lcIdx < length &&
      (type == 'max'
        ? arr[parent] < arr[lcIdx]
        : arr[parent] > arr[lcIdx])
    )
      swap(arr, parent, lcIdx)

    if (rcIdx < length && (type == 'max'
        ? arr[parent] < arr[rcIdx]
        : arr[parent] > arr[rcIdx])
    )
      swap(arr, parent, rcIdx)
  }
  return arr
}

// console.log(buildHeap([5, 8, 1, 2, 3, 53, 3], 'min'))
/*Insert(5)
 console.log(GetMedian())
 Insert(2)
 console.log(GetMedian())
 Insert(3)
 console.log(GetMedian())
 Insert(4)
 console.log(GetMedian())
 Insert(1)
 console.log(GetMedian())
 Insert(6)
 console.log(GetMedian())
 Insert(7)
 console.log(GetMedian())
 Insert(0)
 console.log(GetMedian())
 Insert(8)
 console.log(GetMedian())*/

function machinesTaskMaxPrice(machinesCount, taskCount, relevants) {
  var machines = relevants.slice(0, machinesCount)
  var tasks = relevants.slice(machinesCount)

  const maximum = 105
  var machineMap = new Array(maximum)
  // 初始化数据
  machines.forEach((e) => {
    var [time, level] = e.split(' ')
    if (!machineMap[level])
      machineMap[level] = [time]
    else
      machineMap[level].push(time)
  })
  // machines项的排序
  machineMap = machineMap.map((e) => e.sort((a, b) => b - a))

  // 初始化数据
  var taskMap = tasks.reduce((prev, cur) => {
    var [time, level] = cur.split(' ')
    var o = {time, level}
    return prev.concat(o)
  }, [])

  // 按总价从大到小排序
  const cmpTask = (a, b) => {
    var {time: atime, level: alevel} = a
    var {time: btime, level: blevel} = b
    var aprice = 200 * atime + 3 * alevel
    var bprice = 200 * btime + 3 * blevel
    if (aprice != bprice)
      return bprice - aprice
    else if (atime != btime)
      return btime - atime
    else
      return blevel - alevel
  }

  taskMap.sort(cmpTask)
  // 找到最小level的刚刚符合time的项
  const solve = (level, time) => {
    for (let i = level; i < maximum; i++) {
      let idx = machineMap[i]
        ? machineMap[i].findIndex((e) => e >= time)
        : -1
      if (idx != -1) {
        machineMap[i].splice(idx, 1)
        return true
      }
    }
    return false
  }
  var i, length = taskMap.length
  var ansAcc = 0, ans = 0
  for (i = 0; i < length; i++) {
    var {time, level} = taskMap[i]
    if (solve(level, time)) {
      ansAcc++
      ans += 200 * time + 3 * level
    }
  }

  return `${ansAcc} ${ans}`
}

/*console.log(machinesTaskMaxPrice(3, 1, [
 '111 4',
 '111 3',
 '111 2',
 '100 1'
 ]))

 console.log(machinesTaskMaxPrice(1, 2, [
 '3 100',
 '3 0',
 '2 100',
 ]))

 console.log(machinesTaskMaxPrice(2, 2, [
 '30 30',
 '29 40',
 '29 31',
 '28 30'
 ]))*/

const maxProfit = function (prices) {
  let length = prices.length
  if (!length)
    return 0

  let min = Number.MAX_VALUE, ans = 0
  prices.forEach(e => {
    min = e < min ? e : min
    ans = e - min > ans ? e - min : ans
  })
  return ans
}

// console.log(maxProfit([3, 2, 3, 1, 2]))
// console.log(maxProfit([20, 12, 11, 5, 2]))

const maxProfitII = function (prices) {
  let length = prices.length
  if (!length)
    return 0

  let min = Number.MAX_VALUE, ans = 0
  prices.forEach(e => {
    if (e <= min)
      min = e
    else {
      ans += e - min
      min = e
    }
  })
  return ans
}
// console.log(maxProfitII([3, 2, 3, 1, 2]))
// console.log(maxProfitII([20, 12, 11, 5, 2]))

const maxProfitIII = function (prices) {
  let length = prices.length
  if (!length)
    return 0
  if (length == 1)
    return 0
  if (length == 2)
    return Math.max(0, prices[1] - prices[0])
  let k, max = Number.MIN_VALUE
  for (k = 1; k < length - 1; k++) {
    max = Math.max(max, sellStock(prices, 0, k)
      + sellStock(prices, k + 1, length - 1))
  }
  max = Math.max(max, sellStock(prices, 0, length - 1))
  return max
}

const sellStock = (prices, start, end) => {
  let min = Number.MAX_VALUE, ans = 0
  let i, cur
  for (i = start; i <= end; i++) {
    cur = prices[i]
    min = cur < min ? cur : min
    ans = cur - min > ans ? cur - min : ans
  }
  return ans
}

// console.log(maxProfitIII([4, 4, 6, 1, 1, 4, 2, 5]))
// console.log(maxProfitIII([20, 12, 11, 5, 2]))

const maxProfitIIIMoreQuicker = function (prices) {
  if (prices.length == 0) {
    return 0;
  }

  let profit = new Array(prices.length)
  let buy = 0;
  buy = prices[0];
  profit[0] = 0;
  for (let i = 1; i < prices.length; i++) {
    profit[i] = Math.max(profit[i - 1], prices[i] - buy);
    buy = Math.min(buy, prices[i]);
  }

  let sell = prices[prices.length - 1];
  let best = 0;
  for (let i = prices.length - 2; i >= 0; i--) {
    best = Math.max(best, sell - prices[i] + profit[i]);
    sell = Math.max(sell, prices[i]);
  }

  return best;
}
// console.log(maxProfitIIIMoreQuicker([4, 4, 6, 1, 1, 4, 2, 5]))
// console.log(maxProfitIIIMoreQuicker([15, 18, 16, 15, 14, 13, 12, 11]))

const maxProfitIV = function (k, prices) {
  const length = prices.length
  if (length < 2)
    return 0
  /*if (k >= (length >> 1)) {
   let ans = 0
   for (let i = 1; i < length; i++)
   if (prices[i] > prices[i - 1])
   ans += prices[i] - prices[i - 1]
   return ans
   }*/
  let arr = new Array(k + 1)
  arr = [...arr].map(e => new Array(length).fill(0))

  let tmpMax = 0, ans = 0
  for (let i = 1; i <= k; i++) {
    tmpMax = arr[i - 1][0] - prices[0]
    for (let j = 1; j < length; j++) {
      arr[i][j] = Math.max(arr[i][j - 1], prices[j] + tmpMax)
      tmpMax = Math.max(tmpMax, arr[i - 1][j] - prices[j])
      ans = Math.max(ans, arr[i][j])
    }
  }

  return ans
}

/*const maxProfitIV = function (k, prices) {
 const length = prices.length
 if (length == 0 || length == 1)
 return 0
 let f = new Array(length).fill(0)
 let g = new Array(length).fill(0)

 let tmpMax = 0, ans = 0, arr, other
 for (let i = 1; i <= k; i++) {
 arr = i % 2 ? g : f
 other = i % 2 ? f : g
 tmpMax = arr[0] - prices[0]
 for (let j = 1; j < length; j++) {
 arr[j] = Math.max(arr[j - 1], prices[j] + tmpMax)
 tmpMax = Math.max(tmpMax, other[j] - prices[j])
 ans = Math.max(ans, arr[j])
 }
 }

 return ans
 }*/
// console.log(maxProfitIV(2, [4, 4, 6, 1, 1, 4, 2, 5]))
// console.log(maxProfitIV(3, [12, 14, 13, 15, 17, 16]))

const kSum = function (arr, k, target) {
  const length = arr.length

  if (length < 1 || k < 1 || k > length)
    return 0
  if (k == length)
    return (arr.reduce((prev, cur) => prev + cur, 0)) == target ? 1 : 0
  let fills = new Array(length).fill(false)
  return kSumCore(fills, arr, k, target, 0, 0, 0)
}

const kSumCore = function (fills, arr, k, target, curidx, curk, curres) {
  /*if (curres == target)
   console.log(curidx, curk, curres)*/
  let ans = 0
  if (!fills[curidx] && k == curk && curres == target)
    ans = 1
  if (fills[curidx] || curidx >= arr.length)
    return ans
  // fills[curidx] = true
  let l = kSumCore(fills, arr, k, target, curidx + 1, curk + 1, curres + arr[curidx])
  // fills[curidx + 1] = false
  let j = kSumCore(fills, arr, k, target, curidx + 1, curk, curres)
  return ans + l + j

}

var kSumDp = function (A, k, target) {
  var length = A.length
  // 三维dp，第一维前i个数，第二维选j个数，第三维结果为t
  // f[i][j][t] = f[i - 1][j - 1][t - A[i]] + f[i - 1][j][t]
  var dp = new Array(length + 1);

  dp = [...dp].map(a => {
    return [...new Array(k + 1)].map(k => {
      return new Array(target + 1).fill(0)
    })
  })

  var i, j, t
  for (i = 0; i <= length; i++)
    for (j = 0; j <= k; j++)
      for (t = 0; t <= target; t++) {
        if (j == 0 && t == 0) {
          dp[i][j][t] = 1
        } else if (i != 0 && j != 0 && t != 0) {
          dp[i][j][t] = dp[i - 1][j][t]
          if (t - A[i - 1] >= 0)
            dp[i][j][t] += dp[i - 1][j - 1][t - A[i - 1]]
        }
      }
  return dp[length][k][target]
}
// console.log('ksumdp', kSumDp([1, 2, 3, 4], 2, 5))
// console.log(kSum([1, 2, 3, 4], 2, 5))

const backPack = function (m, A) {
  // var length = A.length
  var ni, mi, item, map = {}
  var dp = new Array(m + 1).fill(0)
  for (ni = 0; (item = A[ni]); ni++) {
    for (mi = 1; mi <= m; mi++) {
      if (dp[mi] + item <= m) {
        map[dp[mi] + item] = Math.max(dp[mi] + item, dp[dp[mi] + item])
      }
      map[mi] || (map[mi] = 0)
      if (mi >= item) {
        dp[mi] = Math.max(map[mi], item, dp[mi], dp[mi - 1])
      } else {
        dp[mi] = Math.max(dp[mi], dp[mi - 1])
      }
    }
    map = {}
    // console.log("backPack:", dp)
  }
  return dp[m]
}
/*const backPack = function (m, A) {
 var length = A.length
 var ni, mi, item, max = 0, maxidx = 0
 var dp = [...new Array(length + 1)].map(e => {
 return new Array(m + 1).fill(0)
 })
 for (ni = 1; (item = A[ni - 1]); ni++) {
 for (mi = 1; mi <= m; mi++) {
 maxidx = dp[ni - 1][mi] + item
 if (maxidx <= m) {
 dp[ni][maxidx] = Math.max(maxidx, dp[ni - 1][maxidx])
 }

 if (mi < item)
 dp[ni][mi] = Math.max(dp[ni][mi - 1], dp[ni - 1][mi], dp[ni][mi])
 else
 dp[ni][mi] = Math.max(item, dp[ni][mi - 1], dp[ni - 1][mi], dp[ni][mi])

 }
 // console.log("backPack:", dp[ni])
 }
 return dp[length][m]
 }*/
console.log(backPack(11, [2, 7, 5, 3]))
console.log(backPack(10, [3, 4, 8, 5]))
/*function maxChocolate(N, M) {
 let lo = 1, hi = M
 while (lo + 1 < hi) {
 let mid = lo + ((hi - lo) >> 1)
 if (isScatisfy(mid, N, M))
 lo = mid
 else
 hi = mid - 1
 }

 if (isScatisfy(lo + 1, N, M))
 console.log(lo + 1)
 else
 console.log(lo)
 }

 function isScatisfy(v, N, M) {
 let ans = v
 for (let i = 1; i < N; i++) {
 if (v == 1) {
 ans += N - i
 break;
 } else {
 ans += (v + 1) / 2
 v = (v + 1) / 2
 }
 }
 return ans <= M
 }

 // maxChocolate(3, 10)

 function howManyCombine(goal, ords, sp) {
 var ans = 0
 var i, j, once, spi
 var ordleng = ords.length
 var splength = sp.length
 // 整除
 for (i = 0; i < ordleng; i++)
 if (goal % ords[i] == 0) {
 ans++
 if (sp.indexOf(ords[i]) > -1)
 ans++
 }
 for (i = 0; i < splength; i++)
 if (sp[i] == goal)
 ans++
 // 组合
 for (i = 1; i < ordleng; i++) {
 var cur = ords[i]
 for (once = 1; once * cur < goal; once++) {
 var remain = goal - cur * once
 // ord
 for (j = i - 1; j >= 0; j--) {
 if (remain % ords[j] == 0) {
 ans++
 if (sp.indexOf(ords[j]) > -1)
 ans++
 }
 }
 }
 }
 return ans
 }
 // console.log(howManyCombine(5,[1,2,3],[1]))

 function rectAcc(str, maxX, maxY, x, y) {
 let i, length = str.length
 for (i = 0; i < length
 && x >= 1
 && x <= maxX
 && y >= 1
 && y <= maxY; i++) {
 let cur = str[i]
 if (cur == 'u')
 x--
 else if (cur == 'r')
 y++
 else if (cur == 'd')
 x++
 else
 y--
 }
 return i
 }
 // console.log(rectAcc('uuurrdddddl', 5, 6, 3, 3))
 // console.log(rectAcc('uuurrdddddl', 5, 6, 4, 2))
 // console.log(rectAcc('uuurrdddddl', 6, 6, 4, 2))

 function kthSmallestPrimeFraction(A, K) {
 var l = 0, r = 1;
 var p = 0, q = 1;

 for (var n = A.length, cnt = 0; true; cnt = 0, p = 0) {
 var m = (l + r) / 2;

 for (var i = 0, j = n - 1; i < n; i++) {
 while (j >= 0 && A[i] > m * A[n - 1 - j])
 j--;
 cnt += (j + 1);

 if (j >= 0 && p * A[n - 1 - j] < q * A[i]) {
 p = A[i];
 q = A[n - 1 - j];
 }
 }

 if (cnt < K) {
 l = m;
 } else if (cnt > K) {
 r = m;
 } else {
 return [p, q]
 }
 }
 }

 // console.log(kthSmallestPrimeFraction([1, 2, 3, 5], 3))

 function kthSmallestPrimeFractionI(A, K) {

 let i, length = A.length
 let heap = [], ansprev, ansnext
 for (i = 1; i < length; i++) {
 heap.push([0, i, A[0] / A[i]])
 }

 buildHeap(heap, compare)
 while (K--) {
 let top = heap.shift();
 [ansprev, ansnext] = top
 if (++top[0] < ansnext) {
 top[2] = A[top[0]] / A[top[1]]
 heap.push(top)
 }
 buildHeap(heap, compare)
 }

 return [A[ansprev], A[ansnext]]

 function compare(a, b) {
 // const [moleculeA, denominatorA] = a
 // const [moleculeB, denominatorB] = b
 return b[2] - a[2]
 }

 function buildHeap(arr, compare) {
 function swap(arr, l, r) {
 var tmp = arr[l]
 arr[l] = arr[r]
 arr[r] = tmp
 }

 var length = arr.length
 var parent = (length >> 1) - 1, lcIdx, rcIdx

 for (; parent >= 0; parent--) {
 lcIdx = 2 * parent + 1
 rcIdx = 2 * (parent + 1)

 if (
 lcIdx < length
 && compare(arr[parent], arr[lcIdx]) < 0
 )
 swap(arr, parent, lcIdx)

 if (rcIdx < length
 && compare(arr[parent], arr[rcIdx]) < 0
 )
 swap(arr, parent, rcIdx)
 }
 return arr
 }
 }*/
// console.log(kthSmallestPrimeFractionI([1, 2, 3, 5], 3))
// console.log(kthSmallestPrimeFractionI([1, 2, 3, 5], 4))
// console.log(kthSmallestPrimeFractionI([1, 2, 3, 5], 5))
// console.log(kthSmallestPrimeFractionI([1, 2, 3, 5], 6))

/*
 var formerIterable = {}
 formerIterable[Symbol.iterator] = function () {
 let idx = 0
 return {
 next () {
 return idx <= 3
 ? {value: idx++, done: false}
 : {value: idx, done: true}
 }
 }
 }
 console.log([...formerIterable])

 var a = {a: 1}, b = {a: 1}
 var wk = new WeakSet([a, b])
 // console.log(wk.has(b)

 var set = new Set([
 ['foo', {value: 1}],
 ['bar', 2]
 ])
 var m1 = new Map(set)
 // console.log(Object.entries(a))
 console.log(m1)
 var curfoo = m1.get('foo')
 console.log(++curfoo.value)

 function instancePolyfill(A, B) {
 var fn = B.prototype
 var o = A.__proto__
 while (true) {
 if (o == null)
 return false
 if (o === fn)
 return true
 o = o.__proto__
 }
 }
 function Shape(...args) {
 let context = {}
 class Inner {
 constructor(width, height) {
 context.width = width
 context.height = height
 }

 get height() {
 return context.height
 }

 sayHello() {
 console.log('hello')
 }
 }
 const instance = new Inner(...args)
 // Shape.prototype = Object.getPrototypeOf(instance)
 /!*const instaceproto = Object.getPrototypeOf(instance)
 Object.setPrototypeOf(Shape, instaceproto)*!/
 Object.setPrototypeOf(Object.getPrototypeOf(instance), this)
 return instance
 }
 const square = new Shape(10, 20)
 console.log(square.width)
 console.log(square.height)
 square.sayHello()
 console.log("square instanceof Shape：", square instanceof Shape)
 console.log("square instanceofPolyfill Shape：", instancePolyfill(square, Shape))
 console.log(square.__proto__)
 console.log(Shape.prototype)
 console.log(Shape.prototype.isPrototypeOf(square))

 var arr = [1]
 console.log(arr.__proto__ == Array.prototype)
 console.log(arr instanceof Array)

 console.log('-----------------------')
 /!*console.log(instancePolyfill(Object,Object));//true
 console.log(instancePolyfill(Function,Function));//true
 console.log(instancePolyfill(Number, Number));//false
 console.log(instancePolyfill(String,String));//false

 console.log(instancePolyfill(Function, Object));//true*!/

 let aa = []
 Object.defineProperty(aa, '0', {
 configurable: true,
 get: function () {
 console.log('getter');
 return 1;
 }
 })
 aa.pop(); // 报错*/

// generator本质上是一个遍历器，可以作为Symbol.iterator
var myIterable = {}
myIterable[Symbol.iterator] = function* () {
  yield 1
  yield 2
  yield 3
}
console.log([...myIterable])

// next函数可以传入参数，该参数会作为上一个yield的返回值
function *dataConsumer(a) {
  console.log(a)
  console.log('Started')
  console.log(`1. ${yield }`)
  console.log(`2. ${yield }`)
  return 'result'
}
let genObj = dataConsumer('params')
console.log(genObj.next())
console.log(genObj.next('a'))
console.log(genObj.next('b'))

// 第一个next()是无法传入参数调用的，除非再包一层function
// wrapper().next('xxx')
function wrapper(generator) {
  return function (...args) {
    var gen = generator(...args)
    gen.next()
    return gen
  }
}
wrapper(function *() {
  console.log(`First input: ${yield }`)
  return 'done!'
})().next('input')

// for...of循环会遍历Generator函数时生成的Iterator对象
// 用Generator实现fibonacci
function *fibonacci() {
  let [prev, cur] = [0, 1]
  for(;;) {
    [prev, cur]=[cur, prev + cur]
    yield cur
  }
}
function doFibonacci(n) {
  var count = 0
  if (n == 1)
    return 0
  else if (n == 2)
    return 1
  else
    for (let res of fibonacci()) {
      if (count++ + 2 >= n)
        return res
    }
}
console.log(doFibonacci(7))
// 给Object.prototype带上iterator
Object.prototype[Symbol.iterator] = function *() {
  const propkeys = Object.keys(this)
  let propkey
  for (propkey of propkeys)
    yield [propkey, this[propkey]]
}
const obja = {name: 'xuzhipeng', age: 22, sex: 'man'}
for (let [key, value] of obja)
  console.log(key, value)
// Generator.prototype.throw：Generator函数返回的遍历器对象，都有一个throw方法，
// 可以在函数体外抛出错误，然后在Generator函数体内捕获
function *g() {
  try {
    yield
  }catch (e) {
    console.log('内部捕获', e)
  }
}
var i = g()
i.next()
try {
  i.throw('a')
  i.throw('b')
} catch (e) {
  console.log('外部捕获', e)
}
// 如果Generator函数内部没有部署try...catch代码块，那么throw方法抛出的错误，将会被外部的try...catch捕获
function *throwerr() {
  while (true) {
    yield
    // console.log('内部捕获', e)
  }
}
var i1 = throwerr()
i1.next()

try {
  i1.throw('a')
  i1.throw('b')
} catch (e) {
  console.log('外部捕获', e)
}
// throw方法被捕获以后，会附带执行下一条yield表达式。也就是会附带执行一次next方法
function *throwerr2() {
  try {
    yield console.log('a')
  } catch (e) {
    // ...
  }
  yield console.log('b')
  yield console.log('c')
}
var generr2 = throwerr2()
generr2.next()
generr2.throw()
generr2.next()

// generator执行过程中一旦抛出错误，且没有被内部捕获就不会执行下去了
// ，如果此后还调用next方法，将返回一个value属性等于undefined、done属性等于true的对象
function *g3() {
  yield 1
  console.log('throwing an exception')
  throw new Error('generator broken!')
  /*try{
    throw new Error('generator broken!')
  } catch (e) {
    console.log(e)
  }*/
  yield 2
  yield 3
}
function log(generator) {
  var v
  console.log('starting generator')
  try {
    v = generator.next()
    console.log('第一次运行next方法', v)
  } catch (err) {
    console.log('捕捉错误', v)
  }

  try {
    v = generator.next()
    console.log('第二次运行next方法', v)
  } catch (err) {
    console.log('捕捉错误', v)
  }

  try {
    v = generator.next()
    console.log('第三次运行next方法', v)
  } catch (err) {
    console.log('捕捉错误', v)
  }
}
log(g3())

// Generator.prototype.return()
// 返回指定的值，终结遍历Generator

// generator里面又要调用一个generator
function *flat(arr) {
  if (!arr || !arr.length)
    return []
  let i, cur
  for (i = 0;(cur = arr[i]);i++)
    if (Array.isArray(cur))
      yield *flat(cur)
    else
      yield cur
}
let flatinit = flat([1,[2,3,[4, [5, 6]]]])
console.log([...flatinit])

// 如果被代理的Generator函数有return语句，那么就可以向代理它的Generator函数返回数据
function *fooreturn() {
  yield 2
  yield 3
  return 'foo'
}
function *generatorInFoo() {
  yield 1
  var v = yield *fooreturn()
  console.log('fooreturn:', v)
  yield 4
}
console.log(...generatorInFoo())

Array.prototype.reducePolyfill = function (fn, initVal) {
  var arr = this
  var flag = initVal == null ? 0 : 1
  var i = flag ? 0 : 1, cur
  var prev = flag ? initVal : arr[0]
  for (;(cur = arr[i]);i++) {
    prev = fn(prev, cur, i, this)
  }
  return prev
}
function es5flatten(arr) {
  return arr.reducePolyfill((arr, val) => arr.concat(Array.isArray(val) ? es5flatten(val) : val), [])
}
console.log(es5flatten([1,[2,3,[4, [5, 6]]]]))

Function.prototype.binds = function (context) {
  var me = this
  var args = Array.prototype.slice.call(arguments, 1)
  var F = function () {}
  F.prototype = this.prototype
  var bound = function () {
    var innerArgs = Array.prototype.slice.call(arguments)
    var finalArgs = args.concat(innerArgs)
    return me.apply(this instanceof F ? this : context || this, finalArgs)
  }
  bound.prototype = new F()
  return bound
}
var o = {}
function foo(p1, p2) {
  this.val = p1+p2
}
var bar = foo.bind(o, 5)
var baz = new bar(2)
console.log(baz.val)
console.log(o)