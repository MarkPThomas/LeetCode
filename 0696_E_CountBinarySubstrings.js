// 2025/05/05
// O(n^2) time complexity
// O(1) space complexity
// Time to complete: 10:44 min
// Patterns: 2 Pointer
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @return {number}
 */
var countBinarySubstrings = function (s) {
  // equal # CONSECUTIVE 0s & 1s
  // can start at each 01 & 10
  //  from these, try growing outwards w/ same char
  //      i.e. 01 -> 0011
  //      Use 2 pointer one for 1/0, the other for 0/1
  //      Iterate over string
  //          Subloop of expand outwards

  function addCount(left) {
    let right = left + 1;

    // Add initial count & increment once outwards to start expansion check
    let count = 1;
    left--;
    right++;

    while (0 <= left && s[left] === s[left + 1]
      && right < s.length && s[right] === s[right - 1]) {
      left--;
      right++;
      count++;
    }

    return count;
  }

  let count = 0;
  for (let i = 0; i < s.length - 1; i++) {
    if (s[i] !== s[i + 1]) {
      count += addCount(i);
    }
  }

  return count;
};