// 2025/03/28
// O(n * k) time complexity
// O(m) space complexity
//  where n = # words, k = avg word length, m = max width - avg word length
// Time to complete: 1:01:31 min
// Patterns: Greedy, simulation
// Notes w.r.t. solution: Was mostly solved in 28:07. Be careful with edge cases & math!
/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
var fullJustify = function (words, maxWidth) {
  const justifiedTotal = [];

  let word = 0;
  while (word < words.length) {
    // word.length may = maxWidth at most => add any word & space placeholder of 0 length
    const justifiedLine = [['', words[word]]];
    let length = words[word].length;
    word++;

    // ==== Add Max Extra Words ====
    // add in as many words as possible per line, left-justified
    // min 1 space between each word, but pad extra to match maxWidth
    // if not enough space for 1 space & next word, just use 1 word w/ spaces after
    // if enough space for 2 words, last word is not followed by any spaces
    while (word < words.length && length + 1 + words[word].length <= maxWidth) {
      justifiedLine.push([' ', words[word]]);
      length += 1 + words[word].length;
      word++;
    }

    // === Padding ===
    // last line should be left-justified w/o extra spaces
    if (word === words.length || justifiedLine.length === 1) {
      // add end padding for last line or line of single word
      while (length < maxWidth) {
        justifiedLine.push([' ', '']);
        length++;
      }
    } else {  // we are not on last line, add intermediate padding
      let i = 1;
      while (length < maxWidth) {
        i %= justifiedLine.length;
        if (i !== 0) { // Skip adding pre-padding to 1st word
          // extra spaces should be as even as possible, padding left->right
          justifiedLine[i][0] += ' ';
          length++;
        }
        i++;
      }
    }

    // ==== Joining ====
    // Join words & following spaces tuples
    for (let i = 0; i < justifiedLine.length; i++) {
      justifiedLine[i] = justifiedLine[i].join('');
    }
    // Add all elements joined into 1 line
    justifiedTotal.push(justifiedLine.join(''));
  }

  return justifiedTotal;
};