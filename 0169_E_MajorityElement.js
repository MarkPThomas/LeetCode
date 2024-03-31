// 2024/03/31
// O(n) time complexity
// O(n) space complexity
// Time to complete: 3:34 min
// Patterns: Hash Map
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
    const targetFreq = Math.floor(nums.length / 2);
    const numsFreq = {};

    for (let i = 0; i < nums.length; i++) {
        if (!numsFreq[nums[i]]) {
            numsFreq[nums[i]] = 1;
        } else {
            numsFreq[nums[i]]++;
        }

        if (numsFreq[nums[i]] > targetFreq) {
            return nums[i];
        }
    }
};

// 2023 Solution
// O(n) time complexity
// O(n) space complexity
// Time to complete: 3 min
// Patterns: Hash Map
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement2023 = function (nums) {
    const count = {};
    nums.forEach((num) => {
        if (!count[num]) {
            count[num] = 0;
        }
        count[num]++;
    })

    const uniqueNums = Object.keys(count);
    for (let i = 0; i < uniqueNums.length; i++) {
        if (count[uniqueNums[i]] > nums.length / 2) {
            return uniqueNums[i];
        }
    }
};


// 2022
// O(N) time complexity
// O(N) space complexity
// Time to complete: 4:11 min
// Patterns:
// Notes w.r.t. solution:

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement2022 = function (nums) {
    let frequency = {};
    for (let i = 0; i < nums.length; i++) {
        if (!frequency[nums[i]]) {
            frequency[nums[i]] = 1;
        } else {
            frequency[nums[i]]++;
        }
    }

    let majorityThreshold = nums.length / 2;
    for (let key in frequency) {
        if (frequency[key] > majorityThreshold) {
            return key;
        }
    }
    return -1;
};

// O(nLog(n)) time complexity
// O(1) space complexity (sorted in place)

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElementWithSort = function (nums) {
    nums.sort();

    // Since majority occurs > n/2 times, it exists at index = n/2
    // Use floor rounding to get index = 0 for array of length 1
    let majorityThresholdIndex = Math.floor(nums.length / 2);
    return nums[majorityThresholdIndex];
};