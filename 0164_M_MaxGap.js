// O(n * k) -> O(n) time complexity
// O(n + k) -> O(n) space complexity
// Time to complete: 13:08 min
// Patterns: Radix sort
// Notes w.r.t. solution: Would have solved in 6:00 but accidentally used a stack rather than queue.

/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumGap = function (nums) {
  function radixSort(nums, base) {
    let max = 0;
    nums.forEach((num => {
      max = Math.max(max, num);
    }));

    let place = 1;
    while (max > 0) {
      countSortPlace(nums, place, base);
      place *= base;
      max = Math.floor(max / base);
    }
  }

  function countSortPlace(nums, place, base) {
    const buckets = Array(base);

    for (let i = 0; i < nums.length; i++) {
      const integer = Math.floor((nums[i] / place)) % base;
      if (!buckets[integer]) {
        buckets[integer] = [];
      }
      buckets[integer].push(nums[i]);
    }

    let sortingPointer = 0;
    for (let digits = 0; digits < base; digits++) {
      const values = buckets[digits];

      while (values && values.length) {
        nums[sortingPointer] = values.shift();;
        sortingPointer++;
      }
    }
  }

  let maxDifference = 0;
  if (nums.length < 2) {
    return maxDifference;
  }

  radixSort(nums, 10);

  for (let i = 1; i < nums.length; i++) {
    const difference = nums[i] - nums[i - 1];
    maxDifference = Math.max(maxDifference, difference);
  }

  return maxDifference;
};

