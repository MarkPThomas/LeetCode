// O(log(n)) time complexity
// O(log(n)) space complexity
// Time to complete: 14 min
// Patterns: Hash map, picking off digits by 1
// Notes w.r.t. solution: Although I was slightly slower, I did a more efficient solutions using 'picking off digits by one'
/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
    const seen = {};
    seen[n] = 1;

    while (true) {
        let sumOfSquares = 0;
        while (n >= 1) {
            sumOfSquares += Math.pow(n % 10, 2);
            n = Math.floor(n / 10);
        }

        if (sumOfSquares === 1) {
            return true;
        }
        if (seen[sumOfSquares]) {
            return false;
        }

        seen[sumOfSquares] = 1;
        n = sumOfSquares;
    }
};


// O(n) time complexity (for int to digit conversion)
// O(n) space complexity (for hash map)
// Time to complete: 11:07 min
// Patterns: Hash map, linked list cycles, runner technique
// Notes w.r.t. solution:
//    Can have time O(log(n)) if using numerical method to parse number.
//    Can have space O(1) if using the runner technique to detect the loop.

/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
    let sum = n;
    let history = {};
    while (sum !== 1) {
        let nPieces = sum.toString().split(''); // O(N) where N = number of digits = log(n)
        sum = 0;
        nPieces.forEach(nPiece => {
            let nPieceInt = parseInt(nPiece);
            sum += nPieceInt * nPieceInt;
        })
        if (history[sum]) {
            return false;
        } else {
            history[sum] = 1;
        }
    }
    return true;
};
