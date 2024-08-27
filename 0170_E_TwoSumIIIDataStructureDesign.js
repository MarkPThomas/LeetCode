// 2024/08/27
// O(1) time complexity for add
// O(n) time complexity for find
// O(n) space complexity
// Time to complete: 16:48 min
// Patterns: Hash map
// Notes w.r.t. solution: Solved faster but got bogged down in case of 0 comparison & 2 * num = value.

var TwoSum = function () {
  this.numFreqs = {};
};

/**
* @param {number} number
* @return {void}
*/
TwoSum.prototype.add = function (number) {
  if (!this.numFreqs[number]) {
    this.numFreqs[number] = 0;
  }
  this.numFreqs[number]++;
};

/**
* @param {number} value
* @return {boolean}
*/
TwoSum.prototype.find = function (value) {
  const nums = Object.keys(this.numFreqs);
  for (let i = 0; i < nums.length; i++) {
    const target = value - nums[i];
    if (this.numFreqs[target]) {
      if (target != nums[i]) {
        return true;
      } else if (this.numFreqs[nums[i]] > 1) {
        return true;
      }
    }
  }
  return false;
};

/**
* Your TwoSum object will be instantiated and called as such:
* var obj = new TwoSum()
* obj.add(number)
* var param_2 = obj.find(value)
*/


// 2024/08/27
// O(1) time complexity for add
// O(n * log(n)) time complexity for find
// O(n) space complexity
// Time to complete: 16:04 min
// Patterns: Sorting, two pointers
// Notes w.r.t. solution:


var TwoSum = function () {
  this.nums = [];
  this.isSorted = false;
};

/**
* @param {number} number
* @return {void}
*/
TwoSum.prototype.add = function (number) {
  this.nums.push(number);
  this.isSorted = false;
};

/**
* @param {number} value
* @return {boolean}
*/
TwoSum.prototype.find = function (value) {
  let left = 0;
  let right = this.nums.length - 1;

  if (!this.isSorted) {
    this.nums.sort((a, b) => a - b);
    this.isSorted = true;
  }

  while (left < right) {
    const sum = this.nums[left] + this.nums[right];
    if (sum > value) {
      right--;
    } else if (sum < value) {
      left++;
    } else {
      return true;
    }
  }

  return false;
};

/**
* Your TwoSum object will be instantiated and called as such:
* var obj = new TwoSum()
* obj.add(number)
* var param_2 = obj.find(value)
*/