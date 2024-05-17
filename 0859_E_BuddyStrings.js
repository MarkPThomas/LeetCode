// 2024/05/16
// O(n) time complexity
// O(1) space complexity
// Time to complete: 11:42 min
// Patterns:
// Notes w.r.t. solution: 26:40 min total since I jumped in too soon without fully considering the question.
//  11:42 min was from the time of restarting the problem from scratch.
/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
var buddyStrings = function (s, goal) {
  function swap(str, i, j) {
    const chars = str.split('');

    const temp = chars[i];
    chars[i] = chars[j];
    chars[j] = temp;

    return chars.join('');
  }

  if (s.length !== goal.length) {
    return false;
  }

  // is s an anagram of goal?
  // does s have exactly 2 letters (or none?) at different indices than goal?
  const matches = {};
  const swappableDiff = [];
  let swappableSame = [];
  for (let i = 0; i < goal.length; i++) {
    if (goal[i] !== s[i]) {
      if (swappableDiff.length === 2) {
        return false;
      }
      swappableDiff.push(i);
    } else {
      if (!matches[goal[i]]) {
        matches[goal[i]] = [];
      }
      matches[goal[i]].push(i);

      if (!swappableSame.length && matches[goal[i]].length === 2) {
        swappableSame = [...matches[goal[i]]];
      }
    }
  }

  // if swapping 1 pair (same or diff letters) makes words match
  let swappedS = '';
  if (swappableDiff.length === 2) {
    swappedS = swap(s, swappableDiff[0], swappableDiff[1]);
  } else if (swappableSame.length === 2 && !swappableDiff.length) {
    swappedS = swap(s, swappableSame[0], swappableSame[1]);
  }

  return swappedS === goal;
};