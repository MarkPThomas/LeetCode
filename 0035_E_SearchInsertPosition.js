// O(log(n)) time complexity
// O(1) space complexity
// Time to complete: 8:41 min
// Patterns: Binary search
// Notes w.r.t. solution: Would have been 5 min but had mistake of taking value rather than index for mid.
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
    let left = 0;
    let right = nums.length - 1;

    if (target < nums[left]) {
        return 0;
    } else if (nums[right] < target) {
        return nums.length;
    }

    while (left <= right) {
        const mid = Math.floor(left + 0.5 * (right - left));

        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            left++;
        } else {
            right--;
        }
    }

    return left;
};


// O(log(n)) time complexity
// O(1) space complexity
// Time to complete: 4 min
// Patterns: Binary search
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2)
        if (nums[mid] === target) {
            return mid;
        }

        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return left;
};

// O(log N) time complexity
// O(1) space complexity
// Time to complete: 26:55 min -> slow implementation of binary search, debugging for range error & by-1 error. Need to practice binary search!
// Patterns: Two-pointers, Binary search
// Notes w.r.t. solution:

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
    // return index of first slot where value >= target
    // O(log n) -> binary search
    if (target <= nums[0]) {
        return 0;
    }
    if (target > nums[nums.length - 1]) {
        return nums.length;
    }

    let startIndex = 0;
    let endIndex = nums.length - 1;
    let midIndex = getMidIndex(startIndex, endIndex);

    while (indexDifference(startIndex, endIndex) > 1) {
        let currentNum = nums[midIndex];
        if (currentNum === target) {
            return midIndex;
        } else if (currentNum < target) {
            startIndex = midIndex + 1
        } else { // currentNum > target
            endIndex = midIndex;
        }
        midIndex = getMidIndex(startIndex, endIndex);
    }

    return nums[midIndex] < target ? midIndex + 1 : midIndex
};

const getMidIndex = function (startIndex, endIndex) {
    return startIndex + Math.floor((endIndex - startIndex) / 2);
}

const indexDifference = function (startIndex, endIndex) {
    return endIndex - startIndex;
}