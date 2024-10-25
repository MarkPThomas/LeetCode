// 2024/10/25
// Initialize
//    O(n * c) time complexity
//    O(n * c) space complexity
// isUnique
//    O(c) time complexity
//    O(1) space complexity
// where n = # words, c = average # chars in words
// Time to complete: 21:42 min
// Patterns: Hashmap
// Notes w.r.t. solution:
/**
 * @param {string[]} dictionary
 */
var ValidWordAbbr = function (dictionary) {
  this.abbrevs = {};

  for (const word of dictionary) {
    const key = this.hash(word);

    if (!this.abbrevs[key]) {
      this.abbrevs[key] = {};
    }
    this.abbrevs[key][word] = true;
  }
};

/**
* @param {string} word
* @return {boolean}
*/
ValidWordAbbr.prototype.isUnique = function (word) {
  const key = this.hash(word);

  // if no matching key, return true
  const abbrevs = this.abbrevs[key];
  if (!abbrevs) {
    return true;
  }

  // if not present, return false
  if (!abbrevs[word]) {
    return false;
  }

  // return whether or not unique to key
  return Object.keys(abbrevs).length === 1;
};

// T: O(c)
ValidWordAbbr.prototype.hash = function (word) {
  if (word.length === 1) {
    return word;
  }

  let firstChar = '';
  let num = 0;
  let lastChar = '';

  for (let i = 0; i < word.length; i++) {
    if (i === 0) {
      firstChar = word[i];
    } else if (i < word.length - 1) {
      num++;
    } else {
      lastChar = word[i];
    }
  }

  let middleChar = num ? num.toString() : '';

  return firstChar + middleChar + lastChar;
}

/**
* Your ValidWordAbbr object will be instantiated and called as such:
* var obj = new ValidWordAbbr(dictionary)
* var param_1 = obj.isUnique(word)
*/