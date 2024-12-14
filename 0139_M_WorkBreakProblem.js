// 2024/12/13
// O(n * k * L) time complexity
// O(n) space complexity
// Time to complete: NA
// Patterns: Dynamic Programming - Iteration
// Notes w.r.t. solution:
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
          return
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

// 2024/12/13
// O(n^3 + k * L) time complexity
// O(n + k * L) space complexity
// Time to complete: NA
// Patterns: BFS
// Notes w.r.t. solution:
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