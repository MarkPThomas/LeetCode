// 2025/04/22
// Initialize
//  O(n) time complexity
//  O(n) space complexity
// pickIndex
// Linear Search
//  O(n) time complexity
//  O(1) space complexity
// Binary Search
//  O(log(n)) time complexity
//  O(1) space complexity
// Time to complete: 26:15 min / 31:16 min
// Patterns: Math, Prefix Sum, Binary Search
// Notes w.r.t. solution: Mostly solved linear search in 20:14, had derp bug. Went from 26:15 to 31:16 refactoring linear to binary search.
/**
 * @param {number[]} w
 */
var Solution = function (w) {
  this.wSum = [];
  this.sum = 0;

  for (const num of w) {
    this.sum += num;
    this.wSum.push(this.sum);
  }
};

/**
* @return {number}
*/
Solution.prototype.pickIndex = function () {
  const target = Math.random() * this.sum;
  // // Linear Search
  // let i = 0;
  // while (i < this.wSum.length) {
  //     if (target < this.wSum[i]) {
  //         return i;
  //     }
  //     i++;
  // }

  // return i - 1;

  // Binary Search
  let left = 0;
  let right = this.wSum.length;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);

    if (target > this.wSum[mid]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
};

/**
* Your Solution object will be instantiated and called as such:
* var obj = new Solution(w)
* var param_1 = obj.pickIndex()
*/