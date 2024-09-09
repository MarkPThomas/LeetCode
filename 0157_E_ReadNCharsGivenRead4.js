// 2024/09/09
// O(n) time complexity
// O(1) space complexity, since buf is ignored but tempBuf only has at most 4 chars
// Time to complete: 16:09 min
// Patterns:
// Notes w.r.t. solution:
/**
 * Definition for read4()
 *
 * @param {character[]} buf4 Destination buffer
 * @return {number} The number of actual characters read
 * read4 = function(buf4) {
 *     ...
 * };
 */

/**
 * @param {function} read4()
 * @return {function}
 */
var solution = function (read4) {
  /**
   * @param {character[]} buf Destination buffer
   * @param {number} n Number of characters to read
   * @return {number} The number of actual characters read
   */
  return function (buf, n) {
    let lastRead = 0;
    let totalRead = 0;
    const max = Math.ceil(n / 4);

    for (let i = 0; i < max; i++) {
      const tempBuf = [];

      lastRead = read4(tempBuf);
      if (!lastRead) {
        break;
      }

      totalRead += lastRead;

      if (totalRead > n) {
        const over = totalRead - n;
        const redBuf = tempBuf.slice(0, tempBuf.length - over);
        buf.push(...redBuf);
        totalRead = n;
      } else {
        buf.push(...tempBuf);
      }
    }

    return totalRead;
  };
};