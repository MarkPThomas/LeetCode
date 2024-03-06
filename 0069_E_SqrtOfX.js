// 2024/03
// O(log(n)) time complexity
// O(1) space complexity
// Time to complete: 12:50 min
// Patterns: Binary search
// Notes w.r.t. solution: Less elegant than prior solution.
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
    if (x === 0 || x === 1) {
        return x;
    }

    let min = 0;
    let max = x;
    let mid = 0;
    while (min < max) {
        mid = Math.floor(min + 0.5 * (max - min));
        const result = mid ** 2;

        if (result > x) {
            max = mid;
        } else if (result === x || (result < x && x < (mid + 1) ** 2)) {
            return mid;
        } else {
            min = mid + 1;
        }
    }

    return mid;
};

// 2023/05
// O(log(n)) time complexity
// O(1) space complexity
// Time to complete: 7 min
// Patterns: Binary search
// Notes w.r.t. solution:
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt2023 = function (x) {
    // Find first # that <= x when squared,
    // such that the next highest # > x when squared
    let left = 0;
    let right = x;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const square = mid * mid;
        if (square === x) {
            return mid;
        }
        if (square < x) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return left - 1;
};


// 2022
// O(log(N)) time complexity
// O(1) space complexity
// Time to complete: 23:20 min
// Patterns: Binary search
// Notes w.r.t. solution: My binary search was a bit funky since I didn't have a proper sense of initial max/mins to start with (max = x/2, min = 2)

/**
 * @param {number} x
 * @return {number}
 */
var mySqrt2022 = function (x) {
    if (x < 2) {
        return x;
    }

    let getPivot = x => Math.floor(x / 2);
    let sqrt = getPivot(x);
    let lastSqrt = x;
    let squared = sqrt * sqrt;
    while (squared !== x && lastSqrt !== sqrt) {
        if (squared < x) {
            // increase unless within 1 int
            if (lastSqrt - sqrt < 2) {
                break;
            }
            sqrt += getPivot(lastSqrt - sqrt);
        } else {
            // decrease
            lastSqrt = sqrt;
            sqrt = getPivot(sqrt);
        }
        squared = sqrt * sqrt;
    }
    return sqrt;
};