// 2025/04/22
// O(s) time complexity
// O(s) space complexity
//  where s = string length
// Time to complete: 1:27:50 min
// Patterns: Queue
// Notes w.r.t. solution: Crux was understanding the problem.
//  Took nearly 20 min to even understand where to start, then had to debug additional corner cases as I understood better.
/**
 * Definition for read4()
 *
 * @param {character[]} buf Destination buffer
 * @return {number} The number of characters read
 * read4 = function(buf4) {
 *     ...
 * };
 */

/**
 * @param {function} read4()
 * @return {function}
 */
var solution = function (read4) {
  const cache = new Queue();

  function cacheExtra(n, totalRead, buf) {
    if (n !== totalRead || !cache.isEmpty()) {
      const preCache = [];

      while (buf.length) {
        preCache.push(buf.pop());
      }

      while (preCache.length) {
        cache.enqueue(preCache.pop());
      }
    }
  }

  // Return extra reads from cache as requested
  function fillFromCache(n, buf) {
    let j = 0;
    while (j < n && cache.size()) {
      buf.push(cache.dequeue());
      j++;
    }
  }

  /**
   * @param {character[]} buf Destination buffer
   * @param {number} n Number of characters to read
   * @return {number} The number of actual characters read
   */
  return function (buf, n) {
    // reads upto 4 chars into buf
    // n may be any #
    // return actual = n if n <= 4 & valid for file
    //  else return 4 if valid for file

    let totalRead = 0;
    let currRead = 0;
    do {
      currRead = read4(buf); // <= buf.length && <= 4
      totalRead += currRead;

      cacheExtra(n, totalRead, buf);
    } while (currRead && totalRead < n)

    if (!buf.length) {
      fillFromCache(n, buf);
    }

    return buf.length;
  };
};