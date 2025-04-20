// 2025/04/20
// O(n^2) time complexity
// O(n^2) space complexity
// Time to complete: 13:45 min
// Patterns:
// Notes w.r.t. solution:
/**
 * @param {string} sentence
 * @return {string}
 */
var toGoatLatin = function (sentence) {
  // if word begins w/ a consonant, move first letter to end first
  // append 'ma' +' word #X 'a' to any word

  function isVowel(char) {
    return char === 'a' || char === 'e' || char === 'i' || char === 'o' || char === 'u';
  }

  const goatWords = [];

  let wordCount = 1;
  const words = sentence.split(' ');
  for (const word of words) {
    let goatWord = word;

    if (!isVowel(word[0].toLowerCase())) {
      const firstChar = word[0];

      const chars = [];
      for (let i = 1; i < word.length; i++) {
        chars.push(word[i]);
      }
      chars.push(firstChar);

      goatWord = chars.join('')
    }

    let suffix = '';
    for (let i = 0; i < wordCount; i++) {
      suffix += 'a';
    }

    goatWord += 'ma' + suffix;

    goatWords.push(goatWord);

    wordCount++;
  }

  return goatWords.join(' ');
};