/**
 * Created by 海枯 on 2018/3/31.
 * 在一个排序的链表中，存在重复的结点，请删除该链表中重复的结点，重复的结点不保留，返回链表头指针。
 * 例如，链表1->2->3->3->4->4->5 处理后为 1->2->5
 */
function ListNode(x) {
  this.val = x;
  this.next = null;
}

// 初始化数据
ListNode.prototype.init = function (arr, refs) {
  if (!arr.length)
    return this

  let lastE = arr.shift()
  let newRet = new ListNode(lastE);
  (refs || this).next = newRet
  return this.init(arr, newRet)
}

/**
 * 基本思路：先用prev记录上一个不重复的节点
 * 当有元素重复时，一直找到重复元素的最后一个元素，
 * 这时将prev.next指向最后一个重复元素的next。
 * 另外注意处理边界的情况
 * @param p 链表的head
 * @returns {*} 处理后链表的head
 */
function deleteDuplication(p) {
  // write code here
  if (p == null || p.next == null)
    return p
  let headIsSet = false, retHead = null
  let run = p, prev = null
  while (run != null) {
    if (run.next == null || run.val != run.next.val) {
      if (!headIsSet) {
        retHead = run
        headIsSet = true
      }
      prev = run
      run = run.next
    } else {
      while (run.next != null && run.val == run.next.val)
        run = run.next;
      if (prev == null) {
        retHead = run.next
        run = run.next
      } else {
        prev.next = run.next;
        run = prev.next
      }
    }

  }
  return retHead
}

let link1 = new ListNode(1).init([2, 3, 3, 4, 4, 5])
let link2 = new ListNode(2).init([2, 2, 3, 3, 4, 4, 5])
let link3 = new ListNode(1).init([2, 3, 3, 4, 4, 5, 5])
console.log(deleteDuplication(link1))
console.log(deleteDuplication(link2))
console.log(deleteDuplication(link3))