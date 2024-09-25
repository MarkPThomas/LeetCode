// 2024/09/25
// DNF
// Patterns: DP
// Notes w.r.t. solution: Was close!
//  Just got hung up on recurrence relation & what to memoize, so bailed to iteration attempt.
//  Solved 2 optimization cases.
/**
 * @param {number[]} nums
 * @return {number}
 */
var deleteAndEarn = function (nums) {
  const numsEarnings = {};
  for (const num of nums) {
    if (!numsEarnings[num]) {
      numsEarnings[num] = 0;
    }
    numsEarnings[num] += num;
  }

  // state: num -> num - 1; num + 1;
  // base case: length = 0;
  // recurrence relation:
  //      Greedy would be to sort by acc value then delete from higher vals?
  //      Subtract num - 1 & num + 1 earnings from sumEarnings
  //      Remove num, num - 1 & num + 1
  //      Try next num
  let earnings = 0;
  while (Object.keys(numsEarnings).length) {
    // Try choosing each #
    let maxProfit = -Infinity;
    let numChoose = null;
    for (const [key, val] of Object.entries(numsEarnings)) {
      let loss = 0;
      const choose = parseInt(key);
      const earning = parseInt(val);

      const deleteLess = choose - 1;
      if (Object.hasOwnProperty(numsEarnings[deleteLess])) {
        loss += numsEarnings[deleteLess];
      }

      const deleteMore = choose + 1;
      if (Object.hasOwnProperty(numsEarnings[deleteMore])) {
        loss += numsEarnings[deleteMore];
      }

      let profit = earning - loss;
      if (profit > maxProfit) {
        maxProfit = profit;
        numChoose = choose;
      }
    }

    earnings += numsEarnings[numChoose];
    delete numsEarnings[numChoose];
    delete numsEarnings[numChoose - 1];
    delete numsEarnings[numChoose + 1];
  }

  return earnings;
};

// Solution :-P
// O(n + k) time complexity
// O(n + k) space complexity
//  where n = length of nums
//    k = max value in nums
// Time to complete: xx min
// Patterns: DP, recursion
// Notes w.r.t. solution: Times out w/o optimization
/**
 * @param {number[]} nums
 * @return {number}
 */
var deleteAndEarn = function (nums) {
  let maxNum = 0;
  const points = {};
  for (const num of nums) {
    if (!points[num]) {
      points[num] = 0;
    }
    points[num] += num;
    maxNum = Math.max(maxNum, num);
  }

  const cache = {};

  function maxPoints(num) {
    // Base Cases
    if (num === 0) {
      return 0;
    }

    if (num === 1) {
      return points[num] ?? 0;
    }

    if (cache[num]) {
      return cache[num];
    }

    // Recurrence relation
    const gain = points[num] ?? 0;
    const maxSkip = maxPoints(num - 1);
    const maxChoose = maxPoints(num - 2);

    cache[num] = Math.max(maxSkip, maxChoose + gain);
    return cache[num];
  }

  return maxPoints(maxNum);
};

// Solution :-P
// O(n + k) time complexity
// O(n) space complexity
//  where n = length of nums
//    k = max value in nums
// Time to complete: xx min
// Patterns: DP, Iteration
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {number}
 */
var deleteAndEarn = function (nums) {
  const points = {};
  let maxNum = 0;
  for (const num of nums) {
    if (!points[num]) {
      points[num] = 0;
    }
    points[num] += num;
    maxNum = Math.max(num, maxNum);
  }

  // Base Cases
  let twoBack = 0;
  let oneBack = points[1] ?? 0;

  for (let num = 2; num <= maxNum; num++) {
    const temp = oneBack;

    const current = points[num] ?? 0;
    oneBack = Math.max(oneBack, twoBack + current);
    twoBack = temp;
  }

  return oneBack;
};


// Solution :-P
// O(n * log(n)) time complexity
// O(n) space complexity
//  where n = length of nums
//    k = max value in nums
// Time to complete: xx min
// Patterns: DP, Iteration
// Notes w.r.t. solution: Optimized to only consider existing #s rather than all #s in range
/**
 * @param {number[]} nums
 * @return {number}
 */
var deleteAndEarn = function (nums) {
  const points = {};
  for (const num of nums) {
    if (!points[num]) {
      points[num] = 0;
    }
    points[num] += num;
  }
  const numsUnique = Object.keys(points).sort((a, b) => a - b);

  // Base Cases
  let twoBack = 0;
  let oneBack = points[numsUnique[0]];

  for (let i = 1; i < numsUnique.length; i++) {
    const num = parseInt(numsUnique[i]);
    const temp = oneBack;

    const current = points[num];
    if (num === parseInt(numsUnique[i - 1]) + 1) {
      oneBack = Math.max(oneBack, twoBack + current);
    } else {
      oneBack += current;
    }

    twoBack = temp;
  }

  return oneBack;
};