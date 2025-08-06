// 2025/04/06
// O(n * c^2) time complexity
// O(n * c) space complexity
//  where n = # words in list, c = # chars in any word
// Time to complete: 17:27 min
// Patterns: Graph BFS
// Notes w.r.t. solution:
/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function (beginWord, endWord, wordList) {
  if (wordList.indexOf(endWord) === -1) {
    return 0;
  }

  function getNextWords(prevWord, nextWords) {
    for (const word of wordList) {
      if (word in pastWords) {
        continue;
      }

      if (has1CharDiff(prevWord, word)) {
        nextWords.push(word);
        pastWords[word] = true;
      }
    }
  }

  function has1CharDiff(word1, word2) {
    let numDifferences = 0;
    for (let i = 0; i < word1.length; i++) {
      if (word1[i] !== word2[i]) {
        numDifferences++;
        if (numDifferences > 1) {
          return false;
        }
      }
    }
    return !!numDifferences;
  }

  const pastWords = {};
  pastWords[beginWord] = true;

  let currWords = [];
  getNextWords(beginWord, currWords);

  let numMidWords = 0;
  while (currWords.length) {
    numMidWords++;

    const nextWords = [];
    for (let i = 0; i < currWords.length; i++) {
      const word = currWords[i];

      if (word === endWord) {
        return numMidWords + 1;
      }

      getNextWords(word, nextWords);
    }
    currWords = nextWords;
  }

  return 0;
};

// ===== Solution =====
// O(n * c^2) time complexity
// O(n * c) space complexity
//  where n = # words in list, c = # chars in any word
// Patterns: Graph BFS Bidirectional
// Notes w.r.t. solution:
/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function (beginWord, endWord, wordList) {
  function getNextWords(prevWord, nextWords, words) {
    for (const word of words) {
      if (has1CharDiff(prevWord, word)) {
        nextWords.push(word);
        words.delete(word);
      }
    }
  }

  function has1CharDiff(word1, word2) {
    let numDifferences = 0;
    for (let i = 0; i < word1.length; i++) {
      if (word1[i] !== word2[i]) {
        numDifferences++;
        if (numDifferences > 1) {
          return false;
        }
      }
    }
    return !!numDifferences;
  }

  let currStart = [beginWord];
  const wordsStart = new Set(wordList);
  if (!wordsStart.has(endWord)) {
    return 0;
  }
  wordsStart.delete(beginWord);

  let currEnd = [endWord];
  const wordsEnd = new Set(wordList);
  wordsEnd.add(beginWord);
  wordsEnd.delete(endWord);

  let numChanges = 0;
  while (currStart.length && currEnd.length) {

    const nextStart = [];
    for (const word of currStart) {
      if (!wordsEnd.has(word)) {
        return 2 * numChanges + 1;
      }

      getNextWords(word, nextStart, wordsStart);
    }
    currStart = nextStart;

    const nextEnd = [];
    for (const word of currEnd) {
      if (!wordsStart.has(word)) {
        return 2 * numChanges + 2;
      }

      getNextWords(word, nextEnd, wordsEnd);
    }
    currEnd = nextEnd;

    numChanges++;
  }

  return 0;
};