// 2025/01/12
// O(n) time complexity
// O(n) space complexity
// Time to complete: xx min
// Patterns: BFS
// Notes w.r.t. solution:
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  const output = [];
  if (!root) {
    return '';
  }

  let row = [root]
  while (row.length) {
    const nextRow = [];
    for (let i = 0; i < row.length; i++) {
      if (row[i]) {
        output.push(row[i].val);
        nextRow.push(row[i].left)
        nextRow.push(row[i].right)
      } else {
        output.push(null);
      }
    }
    row = nextRow;
  }

  return output.join(',');
};

/**
* Decodes your encoded data to tree.
*
* @param {string} data
* @return {TreeNode}
*/
var deserialize = function (data) {
  const array = data.split(',');
  if (array[0] === '') {
    return null;
  }

  const root = new TreeNode(Number(array[0]));

  let row = [root];
  let i = 0;
  while (i < array.length && row.length) {
    const nextRow = [];
    for (let j = 0; j < row.length; j++) {
      const parent = row[j];

      i++;
      console.log('i', i)
      console.log('array[i]', array[i])
      const nodeL = array[i] !== '' ? new TreeNode(Number(array[i])) : null;
      if (nodeL) {
        parent.left = nodeL;
        nextRow.push(nodeL);
      }

      i++;
      console.log('i', i)
      console.log('array[i]', array[i])
      const nodeR = array[i] !== '' ? new TreeNode(Number(array[i])) : null;
      if (nodeR) {
        parent.right = nodeR;
        nextRow.push(nodeR);
      }
    }

    row = nextRow;
  }

  return root;
};

/**
* Your functions will be called as such:
* deserialize(serialize(root));
*/