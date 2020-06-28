const { buildLinkNode, ListNode } = require('../util/linkNode')

/**
 * 题解：三指针法：
 * 1. 先建立一个假元素，装着最终链表的头指针
 * 2. 建立2个变量，l与r，当l与r相同时，r一直往最右侧移动
 * 3. 如果l与r相等时，说明没有重复节点
 * @param {ListNode} head 头结点
 */
var deleteDuplicates = function(head) {
  let mock = new ListNode(-1)
  const ansHead = mock
  
  let l = head
  let r = head

  while (l) {
      while(r.next && r.next.val === l.val) {
          r = r.next
      }

      if (l === r) {
          mock.next = r
          mock = r
      }
      l = r = r.next
  }
  mock.next = l
  return ansHead.next
};

const example1 = buildLinkNode([1,2,3,3,4,4,5])
console.log(deleteDuplicates(example1))

const example2 = buildLinkNode([2,2,3,3])
console.log(deleteDuplicates(example2))