// 2025/06/24
// O(s + t * log(s)) time complexity
//  where s = length of source, t = length of target
// O(s) space complexity
// Time to complete: 21:19 min
// Patterns: Greedy, 2 Pointer, Binary Search
// Notes w.r.t. solution:
/**
 * @param {string} source
 * @param {string} target
 * @return {number}
 */
var shortestWay = function (source, target) {

  function getNextIdx(char, charIdxs, targetIdx) {
    let min = 0;
    let max = charIdxs.length - 1;
    if (targetIdx < charIdxs[min]) {
      return charIdxs[min];
    } else if (charIdxs[max] <= targetIdx) {
      return -1;
    }

    while (max - min > 1) {
      const mid = min + Math.floor((max - min) / 2);

      if (charIdxs[mid] < targetIdx) {
        min = mid;
      } else { // >=
        max = mid;
      }
    }

    return charIdxs[max] === targetIdx ? charIdxs[max + 1] : charIdxs[max];
  }

  const charIdxs = {};
  for (let i = 0; i < source.length; i++) {
    charIdxs[source[i]] ??= [];
    charIdxs[source[i]].push(i);
  }

  let minSubs = 0;
  let j = -1;
  for (let i = 0; i < target.length; i++) {
    const char = target[i];
    if (!(char in charIdxs)) {
      return -1;
    }

    j = getNextIdx(char, charIdxs[char], j);
    if (j === -1) {
      minSubs++;
      j = charIdxs[char][0];
    }
  }
  minSubs++;  // For last subsequence

  return minSubs;
};

// 2025/06/24
// O(t * s) time complexity
// O(26) -> O(1) space complexity
//  where s = length of source, t = length of target
// Time to complete: 21:19 min
// Patterns: Greedy, 2 Pointer
// Notes w.r.t. solution:
/**
 * @param {string} source
 * @param {string} target
 * @return {number}
 */
var shortestWay = function (source, target) {
  // if target has any chars not in source, impossible
  // 2 ptr on target
  //  for each char on target, find next occurrence of char in source
  //      if end of word reached, move to next char on targt & repeat from beginning
  //      if no matches ever found, return -1
  //      optimize: for each char, note final idx in source.
  //          This tells us when to stop early
  // Greedy in finding the max subsequence match in target before moving to next char
  const lastIdxs = {};
  for (let i = 0; i < source.length; i++) {
    lastIdxs[source[i]] = i;
  }

  let minSubs = 0;
  let j = -1;
  for (let i = 0; i < target.length; i++) {
    const char = target[i];
    if (!(char in lastIdxs)) {
      return -1;
    }

    j++;
    while (source[j] !== char) {
      if (lastIdxs[char] < j) { // reset
        j = -1;
        minSubs++;
      } else {
        j++;
      }
    }
  }
  minSubs++;  // For last subsequence

  return minSubs;
};

// ==== Solutions ====
// O(s + t) time complexity
//  where s = length of source, t = length of target
// O(s) space complexity
// Patterns: Greedy, 2 Pointer, Pre-processing
// Notes w.r.t. solution:
