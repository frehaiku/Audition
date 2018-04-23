/**
 * Created by 海枯 on 2018/4/23.
 */
function LinkList(val) {
  this.val = val
  this.next = null
}
function DoubleLinkList(val) {
  this.val = val
  this.prev = null
  this.next = null
}

function reserveLinkNode(root) {
  if (root == null || root.next == null)
    return root
  var prev = null, cur = root, n = root.next
  while (cur) {
    cur.next = prev
    prev = cur
    cur = n
    n = n && n.next
  }
  return prev
}

var l1 = new LinkList(1)
var l2 = new LinkList(3)
var l3 = new LinkList(5)
l1.next = l2
l2.next = l3

console.log(reserveLinkNode(l1))

function reserveDoubleLinkNode(root) {
  if (root == null || root.next == null)
    return root
  var pre = null, cur = root, n = root.next
  while (cur) {
    cur.next = pre
    if (pre)
      pre.prev = cur
    pre = cur
    cur = n
    n = n && n.next
  }
  pre.prev = null
  return pre
}

var r1 = new DoubleLinkList(1)
var r2 = new DoubleLinkList(3)
var r3 = new DoubleLinkList(5)
r1.next = r2
r2.prev = r1
r2.next = r3
r3.prev = r2

console.log(reserveDoubleLinkNode(r1))