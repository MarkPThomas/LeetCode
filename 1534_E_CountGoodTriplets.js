// 2025/05/03
// O(n^3) time complexity
// O(1) space complexity
// Time to complete: 3:45 min
// Patterns: Brute Force (enumeration)
// Notes w.r.t. solution: Brute Force N^3 is acceptable. Optimized solution is NOT easy
/**
 * @param {number[]} arr
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number}
 */
var countGoodTriplets = function (arr, a, b, c) {
  function goodIJ(i, j) {
    return Math.abs(arr[i] - arr[j]) <= a;
  }

  function goodJK(j, k) {
    return Math.abs(arr[j] - arr[k]) <= b;
  }

  function goodIK(i, k) {
    return Math.abs(arr[i] - arr[k]) <= c;
  }

  let numGoodTriplets = 0;

  for (let i = 0; i < arr.length - 2; i++) {
    for (let j = i + 1; j < arr.length - 1; j++) {
      for (let k = j + 1; k < arr.length; k++) {
        if (goodIJ(i, j) && goodIK(i, k) && goodJK(j, k)) {
          numGoodTriplets++;
        }
      }
    }
  }

  return numGoodTriplets;
};