// 2025/05/10
// Initialize
//  O(n) time complexity
//  O(m) space complexity
// pick
//  O(1) time complexity
//  O(1) space complexity
//  where n = # nums, m = maxNum - minNum
// Time to complete: 8:59 min
// Patterns: Bucket Sort (or Hashmap)
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 */
var Solution = function (nums) {
  // Bucket sort?
  // Sort & then binary search?
  let min = Infinity;
  let max = -Infinity;
  for (const num of nums) {
    min = Math.min(min, num);
    max = Math.max(max, num);
  }

  this.offset = min;
  this.nums = new Array(max - min + 1);

  for (let i = 0; i < nums.length; i++) {
    const numStore = nums[i] - this.offset;
    if (this.nums[numStore] === undefined) {
      this.nums[numStore] = [];
    }
    this.nums[numStore].push(i);
  }
};

/**
* @param {number} target
* @return {number}
*/
Solution.prototype.pick = function (target) {
  const idxs = this.nums[target - this.offset];
  const idxsIdx = Math.floor(Math.random() * idxs.length);

  return idxs[idxsIdx];
};

/**
* Your Solution object will be instantiated and called as such:
* var obj = new Solution(nums)
* var param_1 = obj.pick(target)
*/