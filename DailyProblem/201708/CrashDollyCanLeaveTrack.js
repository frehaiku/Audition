/**
 * Created by 海枯 on 2017/9/10.
 */
function main(trackMax, arr) {
  // better describe to obj
  var maps = []
  arr.forEach(item => {
    var obj = {}
    obj.power = +item[0]
    obj.locate = +item[1]
    obj.direction = +item[2]
    maps.push(obj)
  })
  // sortion according to locate
  maps.sort(function (p, n) {
    var l = p.locate - n.locate
    return !l ? p.direction - n.direction : l
  })
  var continous = 0
  var length = maps.length
  var ans = 0
  while (continous != length) {
    continous=0
    for (var i = 0; i < length; i++) {
      var cur = maps[i]
      var power = cur.power
      var dir = cur.direction
      var locate = cur.locate
      if (power > 0 && locate >= 0 && locate <= trackMax - 1) {
        if (dir == -1) {
          if (locate == 0) {
            // reset to 0, voiding to next time judge
            cur.locate = -1
            cur.power = 0
            ans++
          } else {
            var prevBlock = maps[i-1]
            // 碰撞，前一个块有能量
            if (i > 0 && prevBlock.locate == locate - 1 && prevBlock.power > 0) {
              cur.locate = locate + 1
              cur.direction = -(dir)
              cur.power--
            } else if (i > 0 && prevBlock.locate == locate - 1 && prevBlock.power <= 0) {
              if (power >= 2) {
                prevBlock.locate--
                if (prevBlock.locate == 0)
                  ans++
                cur.locate--
                cur.pow -= 2
              } else {
                cur.power--
              }

            } else {
              cur.locate = locate - 1
              cur.power--
            }
          }
        } else if (dir == 1) {
          var endInc = trackMax - 1
          if (cur.locate == endInc) {
            // reset to 0, voiding to next time judge
            cur.power = 0
            cur.locate = endInc+1
            ans++
          } else {
            var next = maps[i + 1]
            // 碰撞，前一个块有能量
            if (next.locate - 1 == locate && next.power > 0) {
              cur.locate = locate - 1
              cur.direction = -(dir)
              cur.power--
            } else if (next.locate - 1 == locate && next.power <= 0) {
              if (power >= 2) {
                cur.locate++
                next.locate++
                if (next.locate == endInc)
                  ans++
                cur.pow -= 2
              } else {
                cur.power--
              }
            }
          }

        }
      } else {
        continous++
      }
    }
  }
  console.log(ans)
}

main(6, [['1', '1', '-1'], ['1', '5', '1']])
main(6, [['1', '5', '1'], ['1', '1', '-1']])
main(6, [[5, 0, 1], [5, 1, -1]])