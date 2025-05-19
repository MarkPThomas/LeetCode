// 2025/05/19
// O(n) time complexity
// O(1) space complexity
// Time to complete: OT min
// Patterns: Greedy
// Notes w.r.t. solution: Was close, but wasted a lot of time coding too early.
//  If I had more carefully broken down & diagrammed cases, I think I would have finished in time, and correct.
//  Solution walkthrough: https://leetcode.com/problems/minimum-swaps-to-make-strings-equal/solutions/6364029/detailed-explaination-java-on-by-godofm4-t4qf/
/**
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
var minimumSwap = function (s1, s2) {
  const X = 'x';
  const Y = 'y';

  let counts = {};
  counts[X] = 0;
  counts[Y] = 0;

  let xyPairs = 0;
  let yxPairs = 0;

  for (let i = 0; i < s1.length; i++) {
    const char1 = s1[i];
    const char2 = s2[i];

    counts[char1]++;
    counts[char2]++;

    if (char1 !== char2) {
      if (char1 === X) {
        xyPairs++;
      } else {
        yxPairs++;
      }
    }
  }

  if (counts[X] % 2 || counts[Y] % 2) {
    return -1;
  }

  // Swap matched xy pairs that can swap diagonally
  let numSwaps = (xyPairs + yxPairs) / 2;

  // If odd # pairs, 2 swaps needed
  numSwaps += (xyPairs % 2 ? 1 : 0);

  return numSwaps;
};