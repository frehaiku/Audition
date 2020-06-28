const { buildTreeNode } = require('../util/treeNode')

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * 题解：
 * 1. DFS的解题要点：想办法在level层数上做文章
 * 2. BFS的解题要点：在层级遍历的末尾加分隔符（如null）
 * @param {TreeNode} root
 * @return {number[][]}
 */
const zigzagLevelOrder = (root) => {
  let ans = []
  const traversal = (root, result, level = 0) => {
    if (root == null) return
    if (result.length === level) {
      result[level] = []
    }
    if (level % 2 === 0) {
      result[level].push(root.val)
    } else {
      result[level].unshift(root.val)
    }

    traversal(root.left, result, level + 1)
    traversal(root.right, result, level + 1)
  }
  traversal(root, ans)
  return ans
}

const example1TreeNode = buildTreeNode([3,9,20,null,null,15,7])
console.log(zigzagLevelOrder(example1TreeNode))