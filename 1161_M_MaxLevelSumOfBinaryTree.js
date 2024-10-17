// 2024/10/16
// O(n) time complexity
// O(n) space complexity
// Time to complete: 7:50 min + 9:11 min to swap array for linked list
// Patterns: BFS in Binary Tree
// Notes w.r.t. solution:
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxLevelSum = function (root) {
  let maxSum = -Infinity;
  let maxSumLevel = 0;

  let level = 0;
  let queueCurr = new Queue1(root);
  let queueNext = new Queue1();

  while (queueCurr.length || queueNext.length) {
    let rowSum = 0;
    level++;
    while (queueCurr.length) {
      const node = queueCurr.shift();
      rowSum += node.val;
      if (node.left) {
        queueNext.push(node.left);
      }
      if (node.right) {
        queueNext.push(node.right);
      }
    }

    if (rowSum > maxSum) {
      maxSum = rowSum;
      maxSumLevel = level;
    }

    queueCurr = queueNext;
    queueNext = [];
  }

  return maxSumLevel;
};

class Queue1 {
  constructor(val) {
    const node = val ? new Node(val) : null;
    this.head = node;
    this.tail = node;
    this.length = node ? 1 : 0;
  }

  push(val) {
    const node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
  }

  shift() {
    if (this.head) {
      const node = this.head;

      this.head = this.head.next;
      node.next = null;

      if (!this.head) {
        this.tail = null;
      }

      this.length--;
      return node.val;
    }
  }
}

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

// 2023/06
// O(n) time complexity
// O(n) space complexity
// Time to complete: 14:00 min
// Patterns: BFS in Binary Tree
// Notes w.r.t. solution: Lost a bit of time with handling sentinel node. Be more careful with this.
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxLevelSum = function (root) {
  let maxSum = -Infinity;
  let levelMaxSum = 0;

  let rowSum = 0;
  let level = 1;
  const ENDROW = 'endRow';
  const queue = [root, ENDROW];

  while (queue.length) {
    const node = queue.shift();
    if (node === ENDROW) {
      if (rowSum > maxSum) {
        maxSum = rowSum;
        levelMaxSum = level;
      }
      if (queue.length) {
        level++;
        rowSum = 0;
        queue.push(ENDROW);
      }
    } else if (node) {
      rowSum += node.val;
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }
  return levelMaxSum;
};