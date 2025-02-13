// 2025/02/13
// O(n) time complexity
// O(1) space complexity
// Time to complete: 32:11 min
// Patterns: 2 Pointers
// Notes w.r.t. solution:
/**
 * @param {character[]} chars
 * @return {number}
 */
var compress = function (chars) {
  // if 1 char, append char
  // else, append char+'group length'
  //      where group length should be broken into multiple separate digits if >10

  // constant space, so 2 pointers? & overwriting chars for 's' rather than
  //  variable 's'?

  function writeCount(count, writerIdx) {
    if (count === 1) { // Leave char w/o count
      return writerIdx;
    }

    let countWrite = count.toString();
    let countIdx = 0;
    while (countIdx < countWrite.length) {
      chars[writerIdx + countIdx] = countWrite[countIdx];
      countIdx++;
    }

    // Return 1 char past count for next write or compressed length
    return writerIdx + countIdx;
  }

  let prevChar = chars[0];
  let count = 1;
  let writerIdx = 1;
  for (let readerIdx = 1; readerIdx < chars.length; readerIdx++) {
    if (chars[readerIdx] === prevChar) {
      count++;
    } else {
      // Write count at left & increment as needed
      writerIdx = writeCount(count, writerIdx);

      // Add next new char & increment to next count index
      chars[writerIdx] = chars[readerIdx];
      writerIdx++;

      // Reset count & char
      count = 1;
      prevChar = chars[readerIdx];
    }

    readerIdx++;
  }

  // Write final count
  writerIdx = writeCount(count, writerIdx);

  return writerIdx;
};