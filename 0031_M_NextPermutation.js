// 2025/03/03
// O(n) time complexity
// O(1) space complexity
// Time to complete: NA min
// Patterns: 2 Pointers
// Notes w.r.t. solution: Worked solution


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