// 2025/06/08
// O(n^3 + k * L) time complexity
// O(n + k * L) space complexity
//  where n = length of s, K = avg # chars of each word, L = # words
// Time to complete: 7:49 min
// Patterns: BFS
// Notes w.r.t. solution: 2nd attempt after Backtracking attempt
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
  const words = new Set(wordDict);
  const lengths = new Set();
  for (const word of wordDict) {
    lengths.add(word.length);
  }

  // BFS
  let charIdxs = [0];
  const seen = new Set();
  while (charIdxs.length) {
    const nextCharIdxs = [];

    for (let i = 0; i < charIdxs.length; i++) {
      const start = charIdxs[i];

      if (start === s.length) {
        return true;
      }

      for (let end = start + 1; end <= s.length; end++) {
        if (seen.has(end)) {
          continue;
        }

        if (lengths.has(end - start) && words.has(s.substring(start, end))) {
          seen.add(end);
          nextCharIdxs.push(end);
        }
      }
    }

    charIdxs = nextCharIdxs;
  }

  return false;
};


// 2025/06/08
// O() time complexity
// O() space complexity
// Time to complete: DNF 8:53 min TLE @ 35/47
// Patterns: Backtracking
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
  const words = new Set();
  const lengths = new Set();
  for (const word of wordDict) {
    words.add(word);
    lengths.add(word.length);
  }

  function backtrack(idxStart, idxEnd, charCount) {
    if (idxEnd >= s.length) {
      return charCount === s.length;
    }

    if (lengths.has(idxEnd - idxStart + 1)) {
      const word = s.substring(idxStart, idxEnd + 1);
      if (words.has(word)) {
        if (backtrack(idxEnd + 1, idxEnd + 1, charCount + word.length)) {
          return true;
        }
      }
    }
    return backtrack(idxStart, idxEnd + 1, charCount);
  }

  return backtrack(0, 0, 0);
};

// 2024/12/13
// O() time complexity
// O(1) space complexity
// Time to complete: OT/42:49 min to TLE
// Patterns: DFS w/ DP (sort of)
// Notes w.r.t. solution: I was so close! For either graph or DP. :-P
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
  const words = {};
  for (const word of wordDict) {
    words[word] = true;
  }

  const wordsAt = Array(s.length).fill().map(() => []);
  for (let startIdx = 0; startIdx < s.length; startIdx++) {
    const chars = [];
    for (let endIdx = startIdx; endIdx < s.length; endIdx++) {
      chars.push(s[endIdx]);

      let word = chars.join('');
      if (words[word]) {
        wordsAt[startIdx].push(word);
      }
    }
  }

  // Words DFS
  const stack = [];
  let idx = 0;
  for (const word of Object.values(wordsAt[idx])) {
    stack.push([word, idx + word.length]);
  }

  while (stack.length) {
    const [nextWord, idx] = stack.pop();

    if (idx === s.length) { // End of word reached
      return true;
    }

    if (!wordsAt[idx]) {  // Word has no following word
      continue;
    }

    for (const word of wordsAt[idx]) {
      const nextIdx = idx + word.length;
      stack.push([word, nextIdx]);
    }
  }

  return false;
};

// ==== Solutions ====
// O(n * k * L) time complexity
// O(n + k * L) space complexity
//  where n = length of s, K = avg # chars of each word, L = # words
// Patterns: Dynamic Programming - Iteration
// Notes w.r.t. solution: Mild speed optimization for large dictionary sets at the cost of space.
//    Instead of iterating all words, we just iterate words that end with the matching current character.
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
  const words = {};
  for (const word of wordDict) {
    let lastChar = word[word.length - 1];
    if (!words[lastChar]) {
      words[lastChar] = [];
    }
    words[lastChar].push(word);
  }


  const dp = Array(s.length).fill(false);

  function checkIndexForWord(i) {
    let prevWords = words[s[i]];
    if (!prevWords) {
      return;
    }

    for (const word of prevWords) {
      // For curr word length matching
      if (i === word.length - 1   // At end of potential first word
        || dp[i - word.length]    // At offset from prior word
      ) {
        // Check char range of word length ending @ position
        const start = i - word.length + 1;
        const end = i + 1;
        if (s.substring(start, end) === word) {
          dp[i] = true;   // Matching word found that ends @ i
          return;
        };
      }
    }
  }

  for (let i = 0; i < s.length; i++) {
    checkIndexForWord(i);
  }

  // Should be True if we made it to the end of the string
  return dp[s.length - 1];
};

// O(n * k * L) time complexity
// O(n) space complexity
//  where n = length of s, K = avg # chars of each word, L = # words
// Patterns: Dynamic Programming - Iteration
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
  const dp = Array(s.length).fill(false);

  function checkIndexForWord(i) {
    for (const word of wordDict) {
      // For curr word length matching
      if (i === word.length - 1   // At end of potential first word
        || dp[i - word.length]    // At offset from prior word
      ) {
        // Check char range of word length ending @ position
        const start = i - word.length + 1;
        const end = i + 1;
        if (s.substring(start, end) === word) {
          dp[i] = true;   // Matching word found that ends @ i
          return;
        };
      }
    }
  }

  for (let i = 0; i < s.length; i++) {
    checkIndexForWord(i);
  }

  // Should be True if we made it to the end of the string
  return dp[s.length - 1];
};

// O(n^3 + k * L) time complexity
// O(n + k * L) space complexity
//  where n = length of s, K = avg # chars of each word, L = # words
// Patterns: BFS
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
  const words = new Set(wordDict);

  // Words BFS
  const queue = [0];
  const seen = new Set();

  while (queue.length) {
    const start = queue.shift();

    if (start === s.length) { // End of word reached
      return true;
    }

    // For each index that ends an unseen word, add the index
    for (let end = start + 1; end <= s.length; end++) {
      if (seen.has(end)) {
        continue;
      }

      if (words.has(s.substring(start, end))) {
        queue.push(end);
        seen.add(end);
      }
    }
  }

  return false;
};