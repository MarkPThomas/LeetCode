// 2025/06/09
// O(n * m^3) time complexity
// O(n * m) space complexity
//  where n = # words, m = avg (or max) word length
// Time to complete: 45:51 min
// Patterns: BFS
// Notes w.r.t. solution: Was getting TLE @ 42/43 after 30:29. Hint reminded me to/how to use 'visited' for BFS in this case.
/**
 * @param {string[]} words
 * @return {string[]}
 */
var findAllConcatenatedWordsInADict = function (words) {
  // concatenated word are words.length >= 2 * wordShortest.length
  // sort words by length?
  // store words by last char?
  // at each char in long word, see if match

  const wordSet = new Set(words);

  function isConcatWord(word) {
    const visited = new Set();
    visited.add(0);

    let starts = [0];
    while (starts.length) {
      const nextStarts = [];
      for (let i = 0; i < starts.length; i++) {
        const start = starts[i];
        if (start === word.length) {
          return true;
        }

        for (let end = start + 1; end <= word.length; end++) {
          if (!visited.has(end) && end - start !== word.length && wordSet.has(word.substring(start, end))) {
            nextStarts.push(end);
            visited.add(end);
          }
        }
      }
      starts = nextStarts;
    }

    return false;
  }

  const concatWords = [];
  for (const word of words) {
    if (isConcatWord(word)) {
      concatWords.push(word);
    }
  }
  return concatWords;
};