// O(1) time complexity
// O(1) space complexity
// Time to complete: 15 min
// Patterns: Hash map
// Notes w.r.t. solution: Chose large fixed size for bucket jeys, array vector to mimic linked list for bucket values, simple modulus for hash key.

var MyHashSet = function () {
  this.buckets = {};
  this.size = 769;
};

MyHashSet.prototype._hash = function (key) {
  return key % this.size;
}

/**
* @param {number} key
* @return {void}
*/
MyHashSet.prototype.add = function (key) {
  const bucketKey = this._hash(key);
  if (!this.buckets.hasOwnProperty(bucketKey)) {
    this.buckets[bucketKey] = [key];
  } else if (!this.contains(key)) {
    this.buckets[bucketKey].push(key);
  }
};

/**
* @param {number} key
* @return {void}
*/
MyHashSet.prototype.remove = function (key) {
  const bucketKey = this._hash(key);
  if (this.buckets[bucketKey]) {
    const index = this.buckets[bucketKey].indexOf(key);
    if (index !== -1) {
      this.buckets[bucketKey].splice(index, 1);
    }
  }
};

/**
* @param {number} key
* @return {boolean}
*/
MyHashSet.prototype.contains = function (key) {
  const bucketKey = this._hash(key);
  if (this.buckets[bucketKey]) {
    return this.buckets[bucketKey].indexOf(key) !== -1;
  }
  return false;
};

/**
* Your MyHashSet object will be instantiated and called as such:
* var obj = new MyHashSet()
* obj.add(key)
* obj.remove(key)
* var param_3 = obj.contains(key)
*/