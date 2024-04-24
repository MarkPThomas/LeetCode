// 2024/04/24
// O(1) time complexity
// O(1) space complexity
// Time to complete: 13:05 min
// Patterns: Hash map
// Notes w.r.t. solution: Improvement from last time with high prime # && using linked list rather than array
var MyHashMap = function () {
  this.maxSize = 33 + 10 ** 4;
  this.buckets = {};
};

MyHashMap.prototype._hash = function (key) {
  return key % this.maxSize;
}

/**
* @param {number} key
* @param {number} value
* @return {void}
*/
MyHashMap.prototype.put = function (key, value) {
  const hash = this._hash(key);

  if (!this.buckets[hash]) {
    this.buckets[hash] = { key, value, next: null };
  } else {
    let node = this.buckets[hash];
    while (node) {
      if (node.key === key) {
        node.value = value;
        return;
      } else if (!node.next) {
        node.next = { key, value, next: null };
      }

      node = node.next;
    }
  }
};

/**
* @param {number} key
* @return {number}
*/
MyHashMap.prototype.get = function (key) {
  const hash = this._hash(key);

  let node = this.buckets[hash];
  while (node) {
    if (node.key === key) {
      return node.value;
    }
    node = node.next;
  }

  return -1;
};

/**
* @param {number} key
* @return {void}
*/
MyHashMap.prototype.remove = function (key) {
  const hash = this._hash(key);

  let prev = null;
  let node = this.buckets[hash];
  while (node) {
    if (node.key === key) {
      if (prev) {
        prev.next = node.next;
      } else if (node.next) {
        this.buckets[hash] = node.next;
      } else {
        this.buckets[hash] = null;
      }
      return;
    }
    prev = node;
    node = node.next;
  }
};

/**
* Your MyHashMap object will be instantiated and called as such:
* var obj = new MyHashMap()
* obj.put(key,value)
* var param_2 = obj.get(key)
* obj.remove(key)
*/

// 2023/05
// O(1) time complexity
// O(1) space complexity
// Time to complete: 16 min
// Patterns: Hash map
// Notes w.r.t. solution: Use a prime # for bucket sizes. Less likely to have collisions

var MyHashMap = function () {
  this.buckets = {};
  this.size = 700; // Note: Use a prime #. Less likely to have collisions
};

MyHashMap.prototype._hash = function (key) {
  return key % this.size;
}

MyHashMap.prototype._indexOfKey = function (bucket, key) {
  for (let i = 0; i < bucket.length; i++) {
    if (bucket[i][0] === key) {
      return i;
    }
  };
  return -1;
}

/**
* @param {number} key
* @param {number} value
* @return {void}
*/
MyHashMap.prototype.put = function (key, value) {
  const hash = this._hash(key);
  if (!this.buckets[hash]) {
    this.buckets[hash] = [];
  }
  const index = this._indexOfKey(this.buckets[hash], key);
  if (index !== -1) {
    this.buckets[hash][index] = [key, value];
  } else {
    this.buckets[hash].push([key, value]);
  }
};

/**
* @param {number} key
* @return {number}
*/
MyHashMap.prototype.get = function (key) {
  const hash = this._hash(key);
  if (this.buckets[hash]) {
    const index = this._indexOfKey(this.buckets[hash], key);
    if (index !== -1) {
      return this.buckets[hash][index][1];
    }
  }
  return -1;
};

/**
* @param {number} key
* @return {void}
*/
MyHashMap.prototype.remove = function (key) {
  const hash = this._hash(key);
  if (this.buckets[hash]) {
    const index = this._indexOfKey(this.buckets[hash], key);
    if (index !== -1) {
      this.buckets[hash].splice(index, 1);
      if (this.buckets[hash].length === 0) {
        delete this.buckets[hash];
      }
    }
  }
};

/**
* Your MyHashMap object will be instantiated and called as such:
* var obj = new MyHashMap()
* obj.put(key,value)
* var param_2 = obj.get(key)
* obj.remove(key)
*/