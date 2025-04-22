// 2025/04/22
//  Initialize:
// O(n) time complexity
// O(n) space complexity
//  sumRange:
// O(1) time complexity
// O(1) space complexity
// Time to complete: 7:46 min
// Patterns: Prefix Sum
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 */
var NumArray = function (nums) {
  this.nums = nums;
  this.sums = {};

  let sum = 0;
  for (let i = 0; i < this.nums.length; i++) {
    sum += this.nums[i];
    this.sums[i] = sum;
  }
};

/**
* @param {number} left
* @param {number} right
* @return {number}
*/
NumArray.prototype.sumRange = function (left, right) {
  if (right === left) {
    return this.nums[left];
  } else if (left === 0) {
    return this.sums[right];
  } else {
    return this.sums[right] - this.sums[left - 1];
  }
};

/**
* Your NumArray object will be instantiated and called as such:
* var obj = new NumArray(nums)
* var param_1 = obj.sumRange(left,right)
*/