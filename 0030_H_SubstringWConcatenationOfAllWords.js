// 2025/04/09
// O() time complexity
// O() space complexity
// Time to complete: OT min
// Patterns:
// Notes w.r.t. solution: Caught on to most key concepts.
//  Got bogged down in details & moving straight to sliding window method when brute force could have sufficed.
/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function (s, words) {
  // sliding window on s
  //  contiguous chars must be comprised of permutations of ALL words concatenated
  //  window length to be valid = words.length * words[0].length
  //  window starts when first word in words found
  //      index is added to result
  //  window ends when a char/word does not match w/ any word in words
  //      a new index may be added after this (i.e. window is reset)

  // words are all of same length
  //  we can increment through s by words[0].length?
  //  brute force is to check all word in words in new window increment
  //  can save time by making a hash of all words
  //  or what about a Trie? Can stop check as soon as char mismatch not found
  //      probably not better than O(n) check in the long-run

  // each word gives a start idx
  //  idx kept if it forms a window of target length, else dropped
  //  idxs kept in queue?

  const wordFreqsTotal = {};
  for (const word of words) {
    wordFreqsTotal[word] ??= 0;
    wordFreqsTotal[word]++;
  }

  const results = [];
  const wordLength = words[0].length;
  const windowMatchLength = words.length * wordLength;

  // console.log('wordFreqsTotal', wordFreqsTotal)
  // console.log('windowMatchLength', windowMatchLength)

  let wordFreqsWindow = {};
  let starts = new Queue();
  let wordIncr = wordLength;
  for (let i = 0; i < s.length; i += wordIncr) {
    // O(n) - maybe char-by-char in trie is better/equiv?
    //      at least can terminate early
    const word = s.substring(i, i + wordLength);
    // console.log('word', word)
    // console.log('results', results)

    if (word in wordFreqsTotal) {
      // console.log('handling word')
      starts.enqueue([i, word]);
      wordIncr = wordLength;

      wordFreqsWindow[word] ??= 0;
      wordFreqsWindow[word]++;

      // Shrink window until counts <=
      while (wordFreqsWindow[word] > wordFreqsTotal[word]) {
        // console.log(' out begin: starts.front()', starts.front())

        const [_, wordOut] = starts.dequeue();
        wordFreqsWindow[wordOut]--;
        // console.log('out end: starts.front()', starts.front())

      }

      // if (!starts.size()) {
      //     continue;
      // }

      // console.log('starts.front()', starts.front())
      // if window length proper, dequeue & add to result, keeps window size constant
      const windowLength = i - starts.front()[0] + wordLength;
      // console.log('window length', windowLength)
      if (windowLength === windowMatchLength) {
        const [idxOut, wordOut] = starts.dequeue();
        wordFreqsWindow[wordOut]--;
        results.push(idxOut);
      }
    } else { // empty queue & restart 1 char forward
      // console.log('emptying queue')
      starts = new Queue();
      wordFreqsWindow = {};

      // Trie could skip more chars by # to first mismatch + 1;
      wordIncr = 1; // Only skip first char
    }
  }

  return results;
};


// ===== Solutions =====

// O(n * a * b − (a * b)^2) time complexity (since total idx is n - a * b, rather than n)
// O(a + b) space complexity
//    where a = # of words, b = word length, n = length of string s
// Patterns: Brute Force w/ Hashmap
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function (s, words) {
  const wordCount = words.length;
  const wordLength = words[0].length;
  const substringSize = wordLength * wordCount;

  const wordFreqs = {};
  for (const word of words) {
    wordFreqs[word] ??= 0;
    wordFreqs[word]++;
  }

  function check(startIdx) {
    // Duplicate wordFreqs Map
    const remaining = Object.assign({}, wordFreqs);

    let wordsUsed = 0;
    // We can go in increments of word length because valid cases must be multiples of this
    for (let j = startIdx; j < startIdx + substringSize; j += wordLength) {
      const word = s.substring(j, j + wordLength);
      if (remaining[word]) {
        remaining[word]--;
        wordsUsed++;
      } else {
        break;
      }
    }
    return wordsUsed === wordCount;
  }

  const results = [];
  // Check each idx as a potential start idx
  for (let startIdx = 0; startIdx < s.length - substringSize + 1; startIdx++) {
    if (check(startIdx)) {
      results.push(startIdx);
    }
  }

  return results;
};


// O(a + n * b) time complexity (a for hashmap creation + sliding window (O(n)) called b times)
// O(a + b) space complexity
//    where a = # of words, b = word length, n = length of string s
// Patterns: Sliding Window
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function (s, words) {
  const wordCount = words.length;
  const wordLength = words[0].length;
  const substringSize = wordLength * wordCount;

  const wordFreqs = {};
  for (const word of words) {
    wordFreqs[word] ??= 0;
    wordFreqs[word]++;
  }

  function slidingWindow(left) {
    let wordsFound = {};
    let wordsUsed = 0;
    let excessWord = false;

    // We can go in increments of word length because valid cases must be multiples of this
    for (let right = left; right <= s.length - wordLength; right += wordLength) { // T:O((n / b) iterations of T:O(2 * b)) = T:O(n)
      const wordIn = s.substring(right, right + wordLength);

      if (wordIn in wordFreqs) { // Valid word

        // Remove outgoing word or until extra word removed
        while (right - left === substringSize || excessWord) {
          const wordOut = s.substring(left, left + wordLength);

          wordsFound[wordOut]--;
          if (wordsFound[wordOut] >= wordFreqs[wordOut]) {
            excessWord = false;
          } else {
            wordsUsed--;
          }

          left += wordLength;
        }

        // Add incoming word
        wordsFound[wordIn] ??= 0;
        wordsFound[wordIn]++;

        if (wordsFound[wordIn] <= wordFreqs[wordIn]) {
          wordsUsed++;
        } else {
          excessWord = true;
        }

        // Save substring found if valid
        if (wordsUsed === wordCount && !excessWord) {
          results.push(left);
        }
      } else { // Nonexisting word found. Clear & shift window to next word.
        wordsFound = {};
        wordsUsed = 0;
        excessWord = false;

        left = right + wordLength;
      }
    }
  }

  const results = [];
  // Try running sliding window beginning from each starting idx up to the end of a valid word
  for (let startIdx = 0; startIdx < wordLength; startIdx++) {
    slidingWindow(startIdx);
  }

  return results;
};