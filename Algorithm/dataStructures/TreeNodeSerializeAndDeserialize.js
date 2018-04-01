/**
 * Created by 海枯 on 2018/3/31.
 */
function TreeNode(x) {
  this.val = x;
  this.left = null;
  this.right = null;
}

function Serialize(root) {
  if (root == null)
    return '#'
  var arr = [root.val]
  return  arr.concat(Serialize(root.left),
    Serialize(root.right))
}

function Deserialize(s) {
  if (!s.length)
    return null
  var n = s.shift()
  var root
  if (n == '#')
    root = null
  else {
    root = new TreeNode(n)
    root.left = Deserialize(s)
    root.right = Deserialize(s)
  }
  return root
}

var root = new TreeNode(8)
root.left = new TreeNode(6)
root.right = new TreeNode(10)
root.left.left = new TreeNode(5)
root.left.right = new TreeNode(7)
root.right.left = new TreeNode(9)
root.right.right = new TreeNode(11)

var serialize = Serialize(root)
console.log(serialize)
console.log(Deserialize(serialize))