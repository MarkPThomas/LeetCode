// 2024/12/24
// O(n) time complexity
// O(1) space complexity
// Time to complete: 3:35 min to refactor
// Patterns: Dynamic Programming (Counting+State Reduction)
// Notes w.r.t. solution: Refactored prior solution to reduced state
/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var numWays = function (n, k) {
  // Base cases
  const post1 = k;
  if (n === 1) {
    return post1;
  }

  const post2 = k * k;
  if (n === 2) {
    return post2;
  }

  // Beginning post 3
  let postPrevPrior = post1;
  let postPrior = post2;

  for (let i = 3; i <= n; i++) {
    let postCurrent = (k - 1) * (postPrior + postPrevPrior);
    postPrevPrior = postPrior;
    postPrior = postCurrent;
  }

  return postPrior;
};

// 2024/12/24
// O(n) time complexity
// O(n) space complexity
// Time to complete: OT min
// Patterns: Dynamic Programming (Counting)
// Notes w.r.t. solution: Was on the right track, but got too much into closed-form calc than recurrence relation.
/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var numWays = function (n, k) {
  // Base cases
  const post1 = k;
  if (n === 1) {
    return post1;
  }

  const post2 = k * k;
  if (n === 2) {
    return post2;
  }

  // Post 3 & higher
  const ways = Array(n + 1);
  ways[1] = post1;
  ways[2] = post2;

  for (let i = 3; i <= n; i++) {
    ways[i] = (k - 1) * (ways[i - 1] + ways[i - 2]);
  }

  return ways[n];
};

