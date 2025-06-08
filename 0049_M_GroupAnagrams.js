// 2025/06/08
// O(n * k) time complexity
// O(n * k) space complexity
//  where n = # words, k = average word length
// Time to complete: 12:15 min (total)
// Patterns: Hashmap, String
// Notes w.r.t. solution: 3:28 min simple solution opimized to generate key w/o sorting
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  // store strs in buckets
  // buckets can be in hashmap w/ anagram key
  // lazy key can be to split word & add as sorted chars
  function getKey(word) {
    const chars = new Array(26).fill(0);
    for (const char of word) {
      const idx = char.charCodeAt() - 'a'.charCodeAt();
      chars[idx]++;
    }

    let key = '';
    for (let i = 0; i < chars.length; i++) {
      const count = chars[i];
      if (count) {
        const char = String.fromCharCode('a'.charCodeAt() + i);
        key += `${char}:${count}`;
      }
    }
    return key;
  }

  const groups = {};
  for (const word of strs) {
    const key = getKey(word);
    groups[key] ??= [];
    groups[key].push(word);
  }

  return Object.values(groups);
};

// 2025/06/08
// O(n * k * log(k)) time complexity
// O(n * k) space complexity
//  where n = # words, k = average word length
// Time to complete: 3:28 min
// Patterns: Hashmap, String
// Notes w.r.t. solution: Can improve time complexity by making a more manual key
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  // store strs in buckets
  // buckets can be in hashmap w/ anagram key
  // lazy key can be to split word & add as sorted chars
  const groups = {};
  for (const word of strs) {
    const key = word.split('').sort().join('');
    groups[key] ??= [];
    groups[key].push(word);
  }

  return Object.values(groups);
};

// 2024/09/27
// O(n * k) time complexity
// O(n * k) space complexity
//  where n = # words
//    k = average word length
// Time to complete: 25:53 min ***
// Patterns: Hashmap, String
// Notes w.r.t. solution: 2024/09: Went OT & gave up on one solution.
//  Did another solution in 14:33 that was TLE.
//  After hint, modified to passing time by 25:53.
//  Jumped into problem solving w/ hashmap category priming a little too mindlessly.
//  Should have more slowly worked out problem logic to keep solution simpler.
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  if (!strs.length) {
    return [];
  }

  const anagrams = {}
  for (let i = 0; i < strs.length; i++) {
    // Convert each word into an anagram key
    const counts = Array(26).fill(0);
    for (let char = 0; char < strs[i].length; char++) {
      const index = strs[i][char].charCodeAt() - 'a'.charCodeAt();
      counts[index]++;
    }

    let chars = [];
    for (let char = 0; char < 26; char++) {
      if (counts[char]) {
        chars.push(`${char}:${counts[char]}|`)
      }
    }
    const key = chars.join('');

    // Check if anagram key exists, if not add it
    if (!anagrams[key]) {
      anagrams[key] = [];
    }
    anagrams[key].push(strs[i]);
  }

  return Object.values(anagrams);
};