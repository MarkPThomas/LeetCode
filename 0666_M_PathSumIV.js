// 2025/01/19
// O(n) time complexity
// O(n) space complexity
// Time to complete: NA min
// Patterns: Tree DFS, Hashmap
// Notes w.r.t. solution: Worked leetcode solution
/**
 * @param {number[]} nums
 * @return {number}
 */
var pathSum = function (nums) {
  const tree = {};

  function dfs(rootRaw, preSum) {
    const root = Math.floor(rootRaw);

    // left & right child coords
    const level = Math.floor(root / 10);
    const position = root % 10;
    const left = (level + 1) * 10 + position * 2 - 1;
    const right = (level + 1) * 10 + position * 2;

    let currSum = preSum + tree[root];

    // If leaf, return root to leaf path sum
    if (!(left in tree) && !(right in tree)) {
      return currSum;
    }

    // Else, continue DFS summing through children
    const leftSum = (left in tree) ? dfs(left, currSum) : 0;
    const rightSum = (right in tree) ? dfs(right, currSum) : 0;

    return leftSum + rightSum;
  }

  // build hash map as nums is parsed, storing {depth-position: val}
  for (let num of nums) {
    const key = Math.floor(num / 10);
    const val = num % 10;
    tree[key] = val;
  }

  return dfs(nums[0] / 10, 0);
};

// 2025/01/19
// O(n) time complexity
// O(n) space complexity
// Time to complete: 49:52 min
// Patterns: Tree BFS, Hashmap
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {number}
 */
var pathSum = function (nums) {
  let totalSum = 0;
  // build hash map as nums is parsed, storing {depth: {position: sum}}
  const tree = {};
  for (let num of nums) {
    const d = Math.floor(num / 100);
    num %= 100;

    const p = Math.floor(num / 10);
    num %= 10;

    const v = num;

    tree[d] ??= {};
    tree[d][p] ??= {};

    //  sum is built up by summing parent sum with current value
    //  each child can find parent of prev row as ceiling(p / 2)
    const sum = v + (d > 1 ? tree[d - 1][Math.ceil(p / 2)] ?? 0 : 0);
    tree[d][p] = sum;
  }

  for (const [dKey, positions] of Object.entries(tree)) {
    for (const [pKey, sum] of Object.entries(positions)) {
      const d = Number(dKey);
      const p = Number(pKey);
      // each missing node pair denotes a leaf end at the parent
      // i.e. if node has no children
      if (!(d + 1 in tree)
        || (!(p * 2 - 1 in tree[d + 1]) && !(p * 2 in tree[d + 1]))
      ) {
        totalSum += sum;
      }
    }
  }

  return totalSum;
};