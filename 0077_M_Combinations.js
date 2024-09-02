// 2024/09/02
// O(n^k) time complexity
// O(n^k) space complexity
// Time to complete: 36:50 min
// Patterns: Backtracking
// Notes w.r.t. solution:
//    Mostly solved in 18:08
//    Debugging to 25:00 showed I had repeated solutions
//    Took until 36:50 to work out how to check for non-unique solutions
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  const solutions = [];

  function isDone(solution, k) {
    return solution.length === k;
  }

  function isValid(candidate, usedCandidates, solution) {
    return (!usedCandidates[candidate]
      && (!solution.length || solution[solution.length - 1] < candidate));
  }

  function place(candidate, usedCandidates) {
    usedCandidates[candidate] = true;
  }

  function remove(candidate, usedCandidates) {
    delete usedCandidates[candidate];
  }

  function backtrack(values, k, usedCandidates) {
    const solution = Object.keys(usedCandidates);
    if (isDone(solution, k)) {
      solutions.push(solution);
      return;
    }

    values.forEach((candidate) => {
      if (isValid(candidate, usedCandidates, solution)) {
        place(candidate, usedCandidates);
        backtrack(values, k, usedCandidates);
        remove(candidate, usedCandidates);
      }
    });
  }

  const values = [];
  for (i = 1; i <= n; i++) {
    values.push(i);
  }

  const usedCandidates = {};
  backtrack(values, k, usedCandidates);

  return solutions;
};