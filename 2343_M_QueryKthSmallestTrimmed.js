// Great Bucket Sort/Radix solution: https://leetcode.com/problems/query-kth-smallest-trimmed-number/solutions/2296474/javascript-bucket-sort-o-mn-200-250ms
//  Reproduced at bottom


// 2024/05/03
// O(m * n * d) time complexity
// O(n) space complexity for 2D array of values & index
// where n = # nums, m = # queries, d = max # digits
// Time to complete: 21:04 min
// Patterns: Brute force, sorting
// Notes w.r.t. solution: Breaks down when sorting large enough numbers, as ending digits are truncated at e40.
//    Final solution added casts at appropriate levels looking at anothers' solution.
//    I haven't used these in JavaScript yet, so had no idea of using them. No extra time added for this.

/**
 * @param {string[]} nums
 * @param {number[][]} queries
 * @return {number[]}
 */
var smallestTrimmedNumbers = function (nums, queries) {
  const results = []; // S: O(m)

  for (let i = 0; i < queries.length; i++) { // T: O(m * n * d)
    const query = queries[i];
    const numsTrimmed = []; // S: O(n)

    for (let j = 0; j < nums.length; j++) { // T: O(n * d)
      const num = nums[j];

      const numTrim = num.substring(num.length - query[1]); // T: O(d)
      numsTrimmed.push(numTrim);
    }

    // T: O(n + n * log(n))
    // S: O(n) for 2D array
    const numParsed = numsTrimmed
      .map((num, index) => [BigInt(num), index])            // BigInt needed for preserving #s with more than 40 digits
      .sort((a, b) => Number(a[0] - b[0]) || a[1] - b[1]);  // Number needed for sorting. 2nd portion is optional, maintains original index order

    let k = numParsed[query[0] - 1][1];

    results.push(k);
  }

  return results;
};

// Great Bucket Sort/Radix solution: https://leetcode.com/problems/query-kth-smallest-trimmed-number/solutions/2296474/javascript-bucket-sort-o-mn-200-250ms
// Solution w/ Radix sort
var smallestTrimmedNumbers = function (nums, queries) {
  // create query index mapping and sort it to match the direction of our bucket sort
  const queriesByTrimLength = queries
    .map((_, i) => i)
    .sort((a, b) => queries[a][1] - queries[b][1]);

  // num mapping which we'll bucket sort and use to fill in our answer with indices
  const numIndices = nums.map((_, i) => i);
  const numLength = nums[0].length;

  // index of the current digit we're sorting
  let digit = 1;

  return queriesByTrimLength.reduce((queryAnswers, queryIdx) => {
    const [k, trim] = queries[queryIdx];

    // sort until we reach the index they want us to query
    while (trim >= digit) {
      bucketSort(numIndices, nums, numLength - digit);
      digit++;
    }

    queryAnswers[queryIdx] = numIndices[k - 1];
    return queryAnswers;
  }, queries.map(() => 0));
};

const bucketSort = (indices, nums, digit) => {
  const buckets = new Array(10).fill(0).map(() => []);

  for (const idx of indices) buckets[+nums[idx][digit]].push(idx);

  let current = 0;
  for (const bucket of buckets) {
    for (const idx of bucket) {
      indices[current] = idx;
      current++;
    }
  }
};