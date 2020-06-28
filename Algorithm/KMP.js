/**
 * Created by 海枯 on 2017/11/1.
 */
function kMP(source, match) {
  if (source.length < match.length)
    return -1
  var next = getNextArray(match)
  var i = 0, j = 0
  while (i < source.length && j < match.length) {
    if (source[i] == match[j]) {
      i++
      j++
    } else if (next[j] == -1)
      i++
    else
      j = next[j]
  }
  return j === match.length ? i - j : -1
}

function getNextArray(str) {
  var next = new Array(str.length)
  var lastm = 0
  next[0] = -1
  next[1] = 0
  var pos = 2
  while (pos < str.length) {
    if (str[pos - 1] === str[lastm])
      next[pos++] = ++lastm
    else if (lastm > 0)
      lastm = next[lastm]
    else {
      lastm = 0
      next[pos++] = lastm
    }
  }
  return next
}
console.log(kMP('abcabcabx', 'babcabx'))
// console.log(kMP('abcabcabx', 'abcabcabx'))