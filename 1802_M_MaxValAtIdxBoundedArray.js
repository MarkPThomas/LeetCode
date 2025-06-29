// 2025/06/28
// O(log(maxSum)) time complexity
// O(1) space complexity
// Time to complete: 23:14 min TLE @ 214/370, OT @ 1:18:15
// Patterns: Binary Search
// Notes w.r.t. solution: 23:14 TLE @ 214/370. OT due to working out more efficient/trickier area summation. Damn math :-P
/**
 * @param {number} n
 * @param {number} index
 * @param {number} maxSum
 * @return {number}
 */
var maxValue = function (n, index, maxSum) {
  // each adj integer is = or 1 +/-
  function getSum(maxNum) {
    let sum = 0;

    // Left of index
    if (maxNum > index) {
      sum += (maxNum + (maxNum - index)) * (index + 1) / 2;
    } else {
      sum += (maxNum + 1) * maxNum / 2 + (index + 1 - maxNum);
    }

    // Right of index
    const indexRev = n - index;
    if (maxNum >= indexRev) {
      sum += (maxNum + (maxNum - indexRev + 1)) * indexRev / 2;
    } else {
      sum += (maxNum + 1) * maxNum / 2 + (indexRev - maxNum);
    }

    return sum - maxNum; // maxNum @ index is double counted
  }

  let min = 1;
  let max = maxSum + 1;
  // let max = Math.ceil(maxSum / n);
  while (max - min > 1) {
    const mid = min + Math.floor((max - min) / 2);
    const sum = getSum(mid);

    if (sum <= maxSum) { // increase maxNum (mid)
      min = mid;
    } else {
      max = mid;
    }
  }

  return min;
};