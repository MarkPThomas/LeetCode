// 2024/05/17
// O(n) time complexity
// O(n) space complexity
// Time to complete: 9:04 min
// Patterns:
// Notes w.r.t. solution:
/**
 * @param {number[]} arr
 * @return {boolean}
 */
var checkIfExist = function (arr) {
  const doubleNs = {};
  for (let i = 0; i < arr.length; i++) {
    if (doubleNs[2 * arr[i]] || doubleNs[arr[i] / 2]) {
      return true;
    }

    if (!doubleNs[arr[i]]) {
      doubleNs[arr[i]] = true;
    }
  }

  return false;
};