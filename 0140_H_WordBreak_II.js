// 2025/06/08
// O(n * 2^n) time complexity
// O(2^n) space complexity
//  n = # chars in "s"
// Time to complete: 23:19 min
// Patterns: Backrtracking
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
var wordBreak = function (s, wordDict) {
  // at each char, see if word formed from last space is in wordDict
  //      if so, try saving it & updating last break
  //      regardless, continue w/o updating break
  //  => backtracking
  // if at end of 's' & last word formed is in wordDict, save entire result
  const sentences = new Set();

  const words = new Set();
  for (const word of wordDict) {
    words.add(word);
  }

  function backtrack(idxStart, idxCurr, wordsCurr) {
    if (idxCurr >= s.length) {
      return;
    }


    const word = getWord(idxStart, idxCurr);
    if (isWord(word)) {
      wordsCurr.push(word);

      if (idxCurr === s.length - 1) {
        sentences.add(wordsCurr.join(' '));
        wordsCurr.pop();
        return;
      }

      backtrack(idxCurr + 1, idxCurr + 1, wordsCurr);
      wordsCurr.pop();
    }

    backtrack(idxStart, idxCurr + 1, wordsCurr);
  }

  // T: O(c)
  // S: O(c)
  function getWord(idxStart, idxCurr) {
    return s.substring(idxStart, idxCurr + 1);
  }

  // T: O(1)
  // S: O(1)
  function isWord(word) {
    return words.has(word);
  }

  backtrack(0, 0, []);

  return [...sentences];
};