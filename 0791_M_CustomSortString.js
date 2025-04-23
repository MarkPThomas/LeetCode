// 2025/04/23
// O(n) time complexity
// O(n) space complexity
//  where n = # of chars in s
// Time to complete: 13:38 min
// Patterns: Hashmap
// Notes w.r.t. solution:
/**
 * @param {string} order
 * @param {string} s
 * @return {string}
 */
var customSortString = function (order, s) {
  // we can specify an order by noting the index & value in order
  // simplest way to order s is:
  //   to find each int in order
  //      add it to the corresponding idx in a new array to return
  //  non-matching chars can be added at end of new array in reverse order
  //  new array is same length as 's'
  //  Since we are looking for chars, & chars might occur more than once (actually are unique)
  //      better to store a char map w/ corresponding order
  // chars in 's' aren't necessarily unique
  //  maybe better to do a pass of 's' to get counts of mutually present chars
  // Then have a ptr go char by char in 'order' & fill chars that # of times
  // After that, fill the rest of the chars
  //  These chars could be counted in a separate map on the same pass
  const sortMap = {};
  for (const char of order) {
    sortMap[char] = 0;
  }

  const unsortedChars = [];
  for (const char of s) {
    if (char in sortMap) {
      sortMap[char]++;
    } else {
      unsortedChars.push(char);
    }
  }

  const sortedChars = [];
  for (const char of order) {
    while (sortMap[char]) {
      sortedChars.push(char);
      sortMap[char]--;
    }
  }
  sortedChars.push(...unsortedChars);

  return sortedChars.join('');
};