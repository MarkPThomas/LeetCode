// 2025/01/12
// O(n) time complexity
// O(n) space complexity
// Time to complete: 50:41 min
// Patterns: BFS
// Notes w.r.t. solution:
/**
 * // Definition for a _Node.
 * function _Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

class Codec {
  constructor() {

  }

  /**
   * @param {_Node|null} root
   * @return {string}
   */
  // Encodes a tree to a single string.
  serialize = function (root) {
    if (!root) {
      return '';
    }

    // const endRow = 'end';
    const output = [];
    let row = [root];
    while (row.length) {
      const nextRow = [];
      for (let i = 0; i < row.length; i++) {
        if (!row[i]) {
          output.push(null);
          continue;
        }

        for (const child of row[i].children) {
          nextRow.push(child);
        }
        nextRow.push(null);

        output.push(row[i].val);
        if (row.length === 1) {
          output.push(null);
        }
      }
      // output.push(endRow)
      row = nextRow;
    }

    return output.join(',');
  };

  /**
   * @param {string} data
   * @return {_Node|null}
   */
  // Decodes your encoded data to tree.
  deserialize = function (data) {
    const array = data.split(',');
    if (array[0] === '') {
      return null;
    }

    const root = new Node(Number(array[0]), []);

    let row = [root];
    let i = 2;
    while (row.length && i < array.length) {
      const nextRow = [];
      for (let j = 0; j < row.length; j++) {
        // Add parent children
        const parent = row[j];
        if (!array[i]) {
          i++;
          continue;
        }

        while (array[i]) {
          const node = new Node(Number(array[i]), []);
          parent.children.push(node);
          nextRow.push(node);
          i++;
        }
        i++;
      }
      row = nextRow;
    }

    return root;
  };
}

// Your Codec object will be instantiated and called as such:
// Codec codec = new Codec();
// codec.deserialize(codec.serialize(root));