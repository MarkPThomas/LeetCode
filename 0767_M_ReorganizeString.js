// 2024/12/25
// O(n * log(k)) -> O(n) time complexity
// O(k) -> O(1) space complexity, ignoring output
//  where n = # chars in string, k = # unique chars in string (e.g. 26) = 1
// Time to complete: 31:13 min
// Patterns: Priority Queue, Hash Map
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @return {string}
 */
var reorganizeString = function (s) {
  const chars = {};
  for (let i = 0; i < s.length; i++) {
    if (!chars[s[i]]) {
      chars[s[i]] = 0;
    }
    chars[s[i]]++;
  }

  let maxChars = new PriorityQueue({ compare: (a, b) => b[1] - a[1] });
  for (const [char, count] of Object.entries(chars)) {
    maxChars.enqueue([char, count]);
  }

  const result = [];
  while (maxChars.size()) {
    // Attempt to place highest # char
    let [char1, count1] = maxChars.dequeue();

    // Add first char or char if valid
    if (!result.length || result[result.length - 1] !== char1) {
      result.push(char1);

      count1--;
      if (count1) {
        maxChars.enqueue([char1, count1]);
      }
    } else if (!maxChars.size()) {
      // Prior dequeued char is not valid, no more chars left
      return '';
    } else { // Add next highest # char
      let [char2, count2] = maxChars.dequeue();
      result.push(char2);

      count2--;
      if (count2) {
        maxChars.enqueue([char2, count2]);
      }
      // Add highest # char back since it was not used
      maxChars.enqueue([char1, count1]);
    }
  }
  return result.join('');
};