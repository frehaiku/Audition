const { buildLinkNode } = require('../util/linkNode');

/**
 * 编写代码，移除未排序链表中的重复节点。保留最开始出现的节点。
 * @param {ListNode} head
 * @return {ListNode}
 */
var removeDuplicateNodes = function(head) {
  if (head == null) {
    return null
  }
  const headOrigin = head
  let hash = {
    [head.val]: 1
  }
  
  while (head.next) {
    const nextVal = head.next.val
    if (nextVal in hash) {
      head.next = head.next.next
    } else {
      hash[nextVal] = 1
      head = head.next
    }
  }
  return headOrigin
};

const listNode = buildLinkNode([1,2,3,3,2,1])
console.log(removeDuplicateNodes(listNode))