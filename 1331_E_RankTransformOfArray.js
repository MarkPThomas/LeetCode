// 2025/05/28
// O(n * log(n)) time complexity
// O(n) space complexity
// Time to complete: 7:52 min
// Patterns: Sort, Hashmap
// Notes w.r.t. solution:
/**
 * @param {number[]} arr
 * @return {number[]}
 */
var arrayRankTransform = function (arr) {
  // go one pass to record #s in ascending order
  //      heap? Bucket sort?
  //      copy & sort?
  const sortedArr = [...arr].sort((a, b) => a - b);

  const ranks = {};
  let rank = 1;
  for (let i = 0; i < sortedArr.length; i++) {
    const num = sortedArr[i];
    if (!(num in ranks)) {
      ranks[num] = rank;
      rank++;
    }
  }

  // 2nd pass assigns rank w/ constant lookup
  for (let i = 0; i < arr.length; i++) {
    arr[i] = ranks[arr[i]];
  }

  return arr;
};