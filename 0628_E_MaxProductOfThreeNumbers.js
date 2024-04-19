// 2024/04/19
// O(n) time complexity
// O(1) space complexity
// Time to complete: 19:36 min
// Patterns:
// Notes w.r.t. solution: Single Scan
/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumProduct = function (nums) {
    // <= 3 +: max 3 positive
    // <= 2 - & 1 +: min 2 negative * max positive
    // all -: max 3 negative

    let max1 = -Infinity;
    let max2 = -Infinity;
    let max3 = -Infinity;

    let min1 = Infinity;
    let min2 = Infinity;

    let maxMin1 = -Infinity;
    let maxMin2 = -Infinity;
    let maxMin3 = -Infinity;

    nums.forEach((num) => {
        if (num > max1) {
            max3 = max2;
            max2 = max1;
            max1 = num;
        } else if (num > max2) {
            max3 = max2;
            max2 = num;
        } else if (num > max3) {
            max3 = num;
        }

        if (num < min1) {
            min2 = min1;
            min1 = num;
        } else if (num < min2) {
            min2 = num;
        }

        if (num < 0 && maxMin1 < num) {
            if (maxMin2 !== -Infinity) {
                if (maxMin3 !== -Infinity) {
                    maxMin3 = maxMin2;
                }
                maxMin2 = maxMin1;
            }
            maxMin1 = num;
        }
    });

    const maxMax = max1 * max2 * max3;
    const maxMin = min1 * min2 * max1;
    return Math.max(maxMax, maxMin);
};

// 2024/04/19
// O(n log(n)) time complexity - for sorting
// O(n) space complexity - for sorting
// Time to complete: 19:09 min
// Patterns:
// Notes w.r.t. solution: Sorting
/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumProduct = function (nums) {
    // get 3 largest positive #s
    // get 2 smallest negative #s
    // get 3 largest negative #s

    if (nums.length === 3) {
        return nums[0] * nums[1] * nums[2];
    }

    nums.sort((a, b) => a - b);
    const minMin = nums[0] * nums[1] * nums[nums.length - 1];
    const maxMin = nums[nums.length - 1] * nums[nums.length - 2] * nums[nums.length - 3];

    if (0 < minMin && 0 < maxMin) {
        return Math.max(maxMin, minMin);
    } else if (0 < minMin) {
        return minMin;
    } else {
        for (let i = 1; i < nums.length; i++) {
            if (nums[i - 1] < 0 && 0 <= nums[i]) {
                const min = 1 < i ? nums[i] * nums[i - 1] * nums[i - 2] : -Infinity;
                const mid = 0 < i && i + 1 < nums.length ? nums[i] * nums[i - 1] * nums[i + 1] : -Infinity;
                const max = 0 < i && i + 2 < nums.length ? nums[i] * nums[i + 1] * nums[i + 2] : -Infinity;

                return Math.max(min, mid, max);
            }
        }
        return nums[nums.length - 1] * nums[nums.length - 2] * nums[nums.length - 3];
    }
};

// 2023 Solution
// O(n) time complexity
// O(1) space complexity
// Time to complete: 28 min
// Patterns:
// Notes w.r.t. solution: Brain stalled out considering avoiding 'naive' solution, also rushed too quickly into coding.
/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumProduct = function (nums) {
    // max product is product of the 3 max
    let max = -Infinity;
    let maxPos1 = -Infinity;
    let maxPos2 = -Infinity;
    let maxNeg1 = 0;
    let maxNeg2 = 0;
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        if (max <= num) {
            maxPos2 = maxPos1;
            maxPos1 = max;
            max = num;
        } else if (maxPos1 <= num) {
            maxPos2 = maxPos1;
            maxPos1 = num;
        } else if (maxPos2 <= num) {
            maxPos2 = num;
        }

        if (num < 0 && num <= maxNeg1) {
            maxNeg2 = maxNeg1;
            maxNeg1 = num;
        } else if (num < 0 && num <= maxNeg2) {
            maxNeg2 = num;
        }
    }

    return Math.max(maxPos1 * maxPos2 * max, maxNeg1 * maxNeg2 * max);
};

// 2022 Solutions
// O(nLog(n)) time complexity
// O(n) space complexity
// Time to complete: 10:25 min.
// Patterns:
// Notes w.r.t. solution: Initially faster but wrong in not considering negative numbers, then not realizing sort() is done alphabetically in JS unless a sorting function if provided.

/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumProductWithSort = function (nums) {
    nums.sort((a, b) => a - b);
    let maximumPositive = 1;
    for (let i = nums.length - 1; i >= nums.length - 3; i--) {
        maximumPositive *= nums[i];
    }

    // if negative #s, 2 negatives & 1 positive may govern
    // in this case, 2 smallest negatives * largest positive;
    let maximumNegative = 1;
    for (let i = 0; i < 2; i++) {
        maximumNegative *= nums[i];
    }
    maximumNegative *= nums[nums.length - 1];

    return Math.max(maximumPositive, maximumNegative);
};

// O(n) time complexity
// O(1) space complexity
// Time to complete: 8:54 min - Finished at 5:30 but had to debug some minor errors. Check more closely!.
// Patterns:

/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumProduct = function (nums) {
    // occurs multiplying 3 largest #s, or 2 smallest & 1 largest
    let max1st = Number.NEGATIVE_INFINITY;
    let max2nd = Number.NEGATIVE_INFINITY;
    let max3rd = Number.NEGATIVE_INFINITY;

    let min1st = Number.POSITIVE_INFINITY;
    let min2nd = Number.POSITIVE_INFINITY;

    for (let i = 0; i < nums.length; i++) {
        let value = nums[i];
        if (value > max1st) {
            max3rd = max2nd;
            max2nd = max1st;
            max1st = value;
        } else if (value > max2nd) {
            max3rd = max2nd;
            max2nd = value;
        } else if (value > max3rd) {
            max3rd = value;
        }

        if (value < min1st) {
            min2nd = min1st;
            min1st = value;
        } else if (value < min2nd) {
            min2nd = value;
        }
    }

    return Math.max(
        max1st * max2nd * max3rd,
        min1st * min2nd * max1st);
};