// 2024/03/22 - optimized
// O(n / k) time complexity
// O(n + k) space complexity
//  where k = # of buckets, n = # of potential keys
// Time to complete:  9:50 min (minor debugging issues then took a LONG time to suss out)
// Patterns: Hash map
// Notes w.r.t. solution: Used linked list instead of array for buckets
var MyHashSet20240322Optimized = function () {
  this.size = 100;
  this.buckets = new Array(this.size);
};

MyHashSet20240322Optimized.prototype._hash = function (key) {
  return key % this.size;
}

/**
* @param {number} key
* @return {void}
*/
MyHashSet20240322Optimized.prototype.add = function (key) {
  const hash = this._hash(key);

  const node = {
    val: key,
    next: null
  };

  if (!this.contains(key)) {
    node.next = this.buckets[hash];
    this.buckets[hash] = node;
  }
};

/**
* @param {number} key
* @return {void}
*/
MyHashSet20240322Optimized.prototype.remove = function (key) {
  const hash = this._hash(key);

  let prevNode = null;
  let node = this.buckets[hash];
  while (node) {
    if (node.val === key) {
      if (prevNode) {
        prevNode.next = node.next;
        node.next = null;
      } else {
        this.buckets[hash] = node.next;
      }
      break;
    } else {
      prevNode = node;
      node = node.next;
    }
  }
};

/**
* @param {number} key
* @return {boolean}
*/
MyHashSet20240322Optimized.prototype.contains = function (key) {
  const hash = this._hash(key);

  if (this.buckets[hash]) {
    let node = this.buckets[hash];
    while (node) {
      if (node.val === key) {
        return true;
      }
      node = node.next;
    }
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


// 2024/03/22
// O(n) time complexity due to n time insert/delete in an array bucket
// O(n + k) space complexity
// Time to complete:  9:50 min (this. & in vs. of errors cost an additional 8 min time)
// Patterns: Hash map
// Notes w.r.t. solution:
var MyHashSet20240322 = function () {
  this.size = 100;
  this.buckets = new Array(this.size);
};

MyHashSet20240322.prototype._hash = function (key) {
  return key % this.size;
}

/**
* @param {number} key
* @return {void}
*/
MyHashSet20240322.prototype.add = function (key) {
  const hash = this._hash(key);
  if (this.buckets[hash] === undefined) {
    this.buckets[hash] = [];
  }
  if (!this.contains(key)) {
    this.buckets[hash].push(key);
  }
};

/**
* @param {number} key
* @return {void}
*/
MyHashSet20240322.prototype.remove = function (key) {
  const hash = this._hash(key);

  let index = -1;
  if (this.buckets[hash]?.length) {
    for (let i = 0; i < this.buckets[hash].length; i++) {
      if (this.buckets[hash][i] === key) {
        index = i;
        break;
      }
    }
  }

  if (index !== -1) {
    this.buckets[hash].splice(index, 1);
  }
};

/**
* @param {number} key
* @return {boolean}
*/
MyHashSet20240322.prototype.contains = function (key) {
  const hash = this._hash(key);

  if (this.buckets[hash]?.length) {
    for (num of this.buckets[hash]) {
      if (num === key) {
        return true;
      }
    }
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

// 2023/05
// O(1) time complexity
// O(1) space complexity
// Time to complete: 15 min
// Patterns: Hash map
// Notes w.r.t. solution: Chose large fixed size for bucket keys, array vector to mimic linked list for bucket values, simple modulus for hash key.
//  Using objects as hash sets might have violated the intention of the exercise...
var MyHashSet2023 = function () {
  this.buckets = {};
  this.size = 769;
};

MyHashSet2023.prototype._hash = function (key) {
  return key % this.size;
}

/**
* @param {number} key
* @return {void}
*/
MyHashSet2023.prototype.add = function (key) {
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
MyHashSet2023.prototype.remove = function (key) {
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
MyHashSet2023.prototype.contains = function (key) {
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