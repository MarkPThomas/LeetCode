// 2025/02/01
// O(n + m) time complexity
// O(1) space complexity
//  where n =  length of s, m = length of t
// Time to complete: 49:09 min
// Patterns: Sliding Window
// Notes w.r.t. solution: Was mostly solved within 20:37.
//  If I came in a bit slower & more methodical, probably could have solved in similar time.
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  const tFreqs = {};
  for (const char of t) {
    tFreqs[char] ??= 0;
    tFreqs[char]++;
  }

  const minSub = {
    length: Infinity,
    start: 0,
    end: 0
  }

  let charsToMatch = Object.keys(tFreqs).length;
  let left = 0;
  const windowFreqs = {};
  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    if (!(char in tFreqs)) {
      continue;
    }

    windowFreqs[char] ??= 0;
    windowFreqs[char]++;

    if (windowFreqs[char] === tFreqs[char]) {
      charsToMatch--;

      if (!charsToMatch) {  // We have found a substring
        // Remove irrelevant or excessive prefix chars
        let charOut = s[left];
        while (!(charOut in tFreqs) || windowFreqs[charOut] > tFreqs[charOut]) {
          if (charOut in tFreqs) {
            windowFreqs[charOut]--;
          }
          left++;
          charOut = s[left];
        }

        // Get substring & update if shorter
        const length = right - left + 1;
        if (length < minSub.length) {
          minSub.length = length;
          minSub.start = left;
          minSub.end = right + 1;
        }

        // Remove first substring char to reset substring search
        windowFreqs[charOut]--;
        charsToMatch++;
        left++;
      }
    }
  }

  return s.substring(minSub.start, minSub.end);
};