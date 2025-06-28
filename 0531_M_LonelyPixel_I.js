// 2025/06/27
// O(m * n) time complexity
// O(m * n) space complexity (O(m + n) if # black cells is less than m * n)
// Time to complete: 18:57 min
// Patterns: Matrix, Hashmap
// Notes w.r.t. solution:
/**
 * @param {character[][]} picture
 * @return {number}
 */
var findLonelyPixel = function (picture) {
  const BLACK = 'B'; // Lonely if no row/col w/ pixel

  // Can keep a hash of rows & cols
  // Count freqs in hashes, while recording locations
  const pixels = {};
  const rows = {};
  const cols = {};
  for (let row = 0; row < picture.length; row++) {
    for (let col = 0; col < picture[row].length; col++) {
      if (picture[row][col] === BLACK) {
        pixels[[row, col]] = [row, col];

        rows[row] ??= 0;
        rows[row]++;

        cols[col] ??= 0;
        cols[col]++;
      }
    }
  }

  // Remove locations that occur more than once in freq row or col
  let numPixelsLonely = 0;
  for (const [row, col] of Object.values(pixels)) {
    if (rows[row] === 1 && cols[col] === 1) {
      numPixelsLonely++;
    }
  }

  return numPixelsLonely;
};