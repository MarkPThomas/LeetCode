// 2025/03/15
// O(2^ n) time complexity
// O(n) space complexity
//  where n = # candidates
// Time to complete: 19:16 min
// Patterns: Backtracking, hashmap
// Notes w.r.t. solution:
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
  function backtracking(start, sum, combinations) {
    if (sum === target) {
      if (!results[combinations])
        results[combinations] = [...combinations];
      return;
    } else if (sum > target) {
      return;
    }

    for (let i = start; i < numsUnique.length; i++) {
      const num = Number(numsUnique[i]);
      const count = numsFreq[num];
      let newSum = sum;
      // Stop early if next # is too large
      if (newSum + num > target) {
        break;
      }

      let mult = 0;
      // Stop early for curr # if next multiple is too large
      while (mult < count && newSum + num <= target) {
        newSum += num;
        combinations.push(num);
        backtracking(i + 1, newSum, combinations);

        mult++;
      }

      while (mult) {
        combinations.pop();
        mult--;
      }
    }
  }

  const results = {};

  const numsFreq = {};
  for (const num of candidates) {
    numsFreq[num] ??= 0;
    numsFreq[num]++;
  }
  const numsUnique = Object.keys(numsFreq);

  backtracking(0, 0, []);

  return Object.values(results);
};