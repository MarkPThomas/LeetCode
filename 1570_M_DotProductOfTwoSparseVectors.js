// 2025/04/22
// Initialize
//  O(n) time complexity
//  O(L) space complexity
// dotProduct
//  O(L) time complexity
//  O(1) space complexity
//  where n = length of input array, L = # of non-zero values
// Time to complete: 9:00 min
// Patterns: Hashmap, Math
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {SparseVector}
 */
var SparseVector = function (nums) {
  this.magnitudes = {};

  for (let i = 0; i < nums.length; i++) {
    const val = nums[i];
    if (val !== 0) {
      this.magnitudes[i] = val;
    }
  }
};

// Return the dotProduct of two sparse vectors
/**
* @param {SparseVector} vec
* @return {number}
*/
SparseVector.prototype.dotProduct = function (vec) {
  let sum = 0;

  for (const [iLocal, valLocal] of Object.entries(this.magnitudes)) {
    if (iLocal in vec.magnitudes) {
      sum += valLocal * vec.magnitudes[iLocal];
    }
  }

  return sum;
};

// Your SparseVector object will be instantiated and called as such:
// let v1 = new SparseVector(nums1);
// let v2 = new SparseVector(nums2);
// let ans = v1.dotProduct(v2);