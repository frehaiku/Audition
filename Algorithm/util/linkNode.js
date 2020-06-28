function ListNode(val) {
  this.val = val;
  this.next = null;
}

const usefulLinkNode = {
  ListNode,
  buildLinkNode(nodeLists) {
    if (nodeLists.length < 1) return null
    const headVal = nodeLists.shift()
    const headNode = new ListNode(headVal)
    headNode.next = usefulLinkNode.buildLinkNode(nodeLists)
    return headNode
  }
}

module.exports = usefulLinkNode