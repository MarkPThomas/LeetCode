// 2025/03/04
// O(n) time complexity
// O(1) space complexity
// Time to complete: 14:02 min
// Patterns: 2 Pointers
// Notes w.r.t. solution: Solution after seeing solution logic
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
  function reverseFrom(i, nums) {
    let j = nums.length - 1;
    while (i < j) {
      swap(i, j, nums);
      i++;
      j--;
    }
  }

  function swap(i, j, nums) {
    const swap = nums[i];
    nums[i] = nums[j];
    nums[j] = swap;
  }

  let i = nums.length - 1;
  while (i > 0 && nums[i] <= nums[i - 1]) {
    i--;
  }

  if (i > 0) {
    let j = nums.length - 1;
    while (j > i && nums[j] <= nums[i - 1]) {
      j--;
    }
    swap(i - 1, j, nums);
  }

  reverseFrom(i, nums);
};

// 2025/03/03
// O() time complexity
// O(1) space complexity
// Time to complete: 33:49 OT min
// Patterns: 2 Pointers
// Notes w.r.t. solution: 202/266 @ 21:15
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
  const pq = new PriorityQueue((a, b) => a - b);

  // Swap #s
  let left = nums.length - 1;
  pq.enqueue(nums[left]);
  left--;

  while (0 <= left) {
    if (nums[left] >= pq.front()) {
      pq.enqueue(nums[left]);
      left--;
    } else {
      const temp = nums[left];
      nums[left] = pq.dequeue();
      pq.enqueue(temp);
      left++;
      break;
    }
  }

  // Add in ascending sorted order after swap
  left = Math.max(left, 0);
  while (pq.size()) {
    nums[left] = pq.dequeue();
    left++;
  }
};