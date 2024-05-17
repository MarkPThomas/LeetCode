// 2024/05/16
// O(n) time complexity
// O(1) space complexity
// Time to complete: 6:33 min
// Patterns: Sliding Window
// Notes w.r.t. solution:
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  let minWindowSize = Infinity;
  let windowSum = 0;

  let leftPtr = 0;
  let rightPtr = 0;
  while (rightPtr < nums.length || leftPtr <= rightPtr) {
    if (windowSum < target) {
      windowSum += nums[rightPtr];
      rightPtr++;
    } else if (leftPtr <= rightPtr) {
      windowSum -= nums[leftPtr];
      leftPtr++;
    }

    if (windowSum >= target) {
      minWindowSize = Math.min(minWindowSize, rightPtr - leftPtr);
    }
  }

  return minWindowSize === Infinity ? 0 : minWindowSize;
};

// 2024/05/16
// O(n) time complexity
// O(n) space complexity
// Time to complete: 18:57 min
// Patterns: Queue
// Notes w.r.t. solution: Add another 14:14 min to build Queue rather than treating array as one.
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  const queue = new SumQueue();
  let runningSum = 0;
  let minSize = Infinity;

  let rightPtr = 0;
  while (rightPtr < nums.length || queue.length) {
    if (runningSum < target) {
      const incomingNum = nums[rightPtr];
      runningSum += incomingNum;

      queue.enqueue(incomingNum);

      rightPtr++;
    } else if (queue.length) {
      runningSum -= queue.dequeue();
    }

    if (runningSum >= target) {
      minSize = Math.min(minSize, queue.length);
    }
  }

  return minSize === Infinity ? 0 : minSize;
};

class SumQueue {
  constructor() {
    this.head = { val: null, next: null };
    this.tail = this.head;
    this.length = 0;
  }


  enqueue(val) {
    const node = { val, next: null }
    this.tail.next = node;
    this.tail = node;
    this.length++;
  }

  dequeue() {
    if (this.head.next) {
      const out = this.head.next;
      this.head.next = this.head.next.next;
      out.next = null;

      this.length--;
      if (!this.length) {
        this.tail = this.head;
      }

      return out.val;
    }
    return null;
  }
}
