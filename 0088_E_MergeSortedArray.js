// 2023
// O(n + m) time complexity
// O(1) space complexity
// where n = length of nums 1, m = length of nums 2
// Time to complete: 25 min (went into 2 wrong solutions at first. Should have thought it out more carefully)
// Patterns: 3 pointers, start from end
// Notes w.r.t. solution:
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void}
 */
var merge = function (nums1, m, nums2, n) {
    let ptr1 = m - 1;
    let ptr2 = n - 1;
    for (let i = m + n - 1; i >= 0; i--) {
        if (ptr2 < 0) { // optimization
            break;
        }
        if (ptr1 >= 0 && nums1[ptr1] >= nums2[ptr2]) {
            nums1[i] = nums1[ptr1];
            ptr1--;
        } else {
            nums1[i] = nums2[ptr2];
            ptr2--;
        }
    }
};

// 2022
// O(m+n) time complexity
// O(1) space complexity
// where n = length of nums 1, m = length of nums 2
// Time to complete: 16 min for main solve, 20:40 for total (a bit too fast again, 99% there, debugging)
// Patterns: Multiple pointers, working from ends forwards
// Notes w.r.t. solution: Got the medium-level solution to the easy problem!

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
    // m states the point where nums1 is 0
    // ultimately nums1 has m+n, so last entry is the least of nums1[m] & nums2[n]
    // makes sense to have 3 pointers:
    //      1. num1 @ m, working forwards
    //      2. num2 @ n, working forwards
    //      3. num1 @ end, working forwards
    if (n === 0) {
        return;
    }

    if (m + n === 0) {
        nums1 = nums2;
        return;
    }

    let num1Index = m - 1;
    let num2Index = n - 1;
    let insertIndex = m + n - 1;

    while (insertIndex >= 0 && num1Index >= 0 && num2Index >= 0) { // O(m+n)
        let value1 = nums1[num1Index];
        let value2 = nums2[num2Index];

        if (value1 < value2) {
            nums1[insertIndex] = value2;
            num2Index--;
        } else {
            nums1[insertIndex] = value1;
            num1Index--;
        }
        insertIndex--;
    }
    // if insertIndex reaches beginning, do nothing
    // if nums2 is emptied first, do nothing
    // if nums1 is emptied first, place remaining nums2 in nums1 in order
    while (num2Index >= 0) {  // O(n)
        nums1[insertIndex] = nums2[num2Index];
        num2Index--;
        insertIndex--;
    }
};