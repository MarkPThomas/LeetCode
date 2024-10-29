// 2024/10/29
// O(1) time complexity
// O(n) space complexity
//   where n = total # items added & not removed
// Time to complete: 32:05
// Patterns: Hashmap
// Notes w.r.t. solution: 15:15 min to T:O(n) in getRand.

var RandomizedSet = function () {
  this.indices = {};
  this.vals = [];
};

/**
* @param {number} val
* @return {boolean}
*/
RandomizedSet.prototype.insert = function (val) {
  if (this.indices.hasOwnProperty(val)) {
    return false;
  }

  this.indices[val] = this.vals.length;
  this.vals.push(val);

  return true;
};

/**
* @param {number} val
* @return {boolean}
*/
RandomizedSet.prototype.remove = function (val) {
  if (!this.indices.hasOwnProperty(val)) {
    return false;
  }

  const lastval = this.vals[this.vals.length - 1];
  const idxVal = this.indices[val];

  this.vals[idxVal] = lastval;
  this.vals.pop();

  this.indices[lastval] = this.indices[val];
  delete this.indices[val];

  return true;
};

/**
* @return {number}
*/
RandomizedSet.prototype.getRandom = function () {
  const randIdx = Math.floor(this.vals.length * Math.random());

  return this.vals[randIdx];
};

/**
* Your RandomizedSet object will be instantiated and called as such:
* var obj = new RandomizedSet()
* var param_1 = obj.insert(val)
* var param_2 = obj.remove(val)
* var param_3 = obj.getRandom()
*/