// 2025/07/02
// O(log(n)) time complexity
// O(1) space complexity
// Time to complete: 17:19 min
// Patterns: Binary Search
// Notes w.r.t. solution: Mostly solved in 10ish min but had lots of little edge cases to consider.
//   Read definition of h more carefully!
/**
 * @param {number[]} citations
 * @return {number}
 */
var hIndex = function (citations) {
  // find largest i where citations[i] >= i + 1
  let min = 0;
  let max = citations.length - 1;

  if (citations[min] >= citations.length) {
    return citations.length;
  }

  while (max - min > 1) {
    const mid = min + Math.floor((max - min) / 2);
    const numPapers = citations.length - mid;

    if (citations[mid] < numPapers) { // fewer papers => increase mid
      min = mid;
    } else { // >=
      max = mid;
    }
  }

  return Math.min(citations.length - max, citations[max]);
};