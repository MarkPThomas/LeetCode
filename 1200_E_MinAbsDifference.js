// 2024/04/03
// O(n + m) time complexity
// O(n + m) space complexity
//  where n = # elements, m = max difference between numbers, or max number.
// Time to complete: 5:38 min (original) + 12:18 min = 17:56 min
// Patterns: Count Sort
// Notes w.r.t. solution:
/**
 * @param {number[]} arr
 * @return {number[][]}
 */
var minimumAbsDifference = function (arr) {
  let min = Infinity;
  let max = -Infinity;
  arr.forEach((num) => {
    min = Math.min(min, num);
    max = Math.max(max, num);
  })

  let offset = min < 0 ? min : 0;

  const counts = new Array(max - offset + 1).fill(0);
  for (let i = 0; i < arr.length; i++) {
    counts[arr[i] - offset]++;
  }


  let pos = 0;
  for (let i = 0; i < counts.length; i++) {
    let count = counts[i];
    while (count) {
      arr[pos] = i + offset;
      pos++;
      count--;
    }
  }

  let minAbsDistance = Infinity;
  for (let i = 1; i < arr.length; i++) {
    const absDistance = Math.abs(arr[i] - arr[i - 1]);
    minAbsDistance = Math.min(minAbsDistance, absDistance);
  }

  const results = []
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] - arr[i - 1] === minAbsDistance) {
      results.push([arr[i - 1], arr[i]]);
    }
  }

  return results;
};

// 2024/04/03
// O(n * log(n)) time complexity
// O(log(n)) space complexity (for sorting)
// Time to complete: 5:38 min
// Patterns:
// Notes w.r.t. solution: Sort + 2 Traversals
/**
 * @param {number[]} arr
 * @return {number[][]}
 */
var minimumAbsDifference = function (arr) {
  arr.sort((a, b) => a - b);

  let minAbsDistance = Infinity;
  for (let i = 1; i < arr.length; i++) {
    const absDistance = Math.abs(arr[i] - arr[i - 1]);
    minAbsDistance = Math.min(minAbsDistance, absDistance);
  }

  const results = []
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] - arr[i - 1] === minAbsDistance) {
      results.push([arr[i - 1], arr[i]]);
    }
  }

  return results;
};