function TreeNode(val) {
  this.val = val
  this.left = null
  this.right = null
}

const usefulTreeNode = {
  TreeNode,
  
  buildTreeNode(treeArr) {
    if (treeArr.length < 1) return null

    let treeRoot = new TreeNode(treeArr.shift())
    let queues = [treeRoot]

    while (treeArr.length) {
      const first = queues[0]
      const lv = treeArr.shift()
      if (lv != null) {
        queues.push((first.left = new TreeNode(lv)))
      }

      const rv = treeArr.shift()
      if (rv != null) {
        queues.push(first.right = new TreeNode(rv));
      }
      queues.shift()
    }

    return treeRoot
  }
}

module.exports = usefulTreeNode

// [3,9,20,null,null,15,7]
// console.log(usefulTreeNode.buildTreeNode([3,9,20,null,null,15,7]))