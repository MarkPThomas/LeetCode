// 2024/11/30
// O(n + e * k) time complexity
// O(n + e * k) space complexity
// Time to complete: 3:34 min
// Patterns: Shortest Path - Bellman-Ford
// Notes w.r.t. solution:
/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
var findCheapestPrice = function (n, flights, src, dst, k) {
  const curr = Array(n).fill(Infinity);
  curr[src] = 0;

  for (let i = 0; i <= k; i++) {
    const prev = [...curr];
    for (const [from, to, price] of flights) {
      if (prev[from] !== Infinity && prev[from] + price < curr[to]) {
        curr[to] = prev[from] + price;
      }
    }
  }

  return curr[dst] === Infinity ? -1 : curr[dst];
};

// 2024/11/30
// O(n + e * k) time complexity
// O(n + e * k) space complexity
// Time to complete: 13:34 min
// Patterns: Shortest Path - SPF
// Notes w.r.t. solution:
/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
var findCheapestPrice = function (n, flights, src, dst, k) {
  if (src === dst) {
    return 0;
  }

  const flightPrices = {};
  for (const [from, to, price] of flights) {
    if (!flightPrices[from]) {
      flightPrices[from] = [];
    }

    flightPrices[from].push([to, price]);
  }

  const minPrices = Array(n).fill(Infinity);
  const queue = [[src, 0]];

  let stops = 0;
  while (queue.length && stops <= k) {
    let stopsCount = queue.length;

    while (stopsCount) {
      const [from, fromPrice] = queue.shift();

      if (!flightPrices[from]) {
        continue;
      }

      for (const [to, price] of flightPrices[from]) {
        const currentPrice = fromPrice + price;

        if (minPrices[to] > currentPrice) {
          minPrices[to] = currentPrice;
          queue.push([to, minPrices[to]]);
        }
      }

      stopsCount--;
    }

    stops++;
  }

  return minPrices[dst] === Infinity ? -1 : minPrices[dst];
};

// 2024/11/26
// O(n + e * k * log(e * k)) time complexity
// O(n + e * k) space complexity
// Time to complete: xx min
// Patterns: Shortest Path - Dijkstra
// Notes w.r.t. solution:
/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
var findCheapestPrice = function (n, flights, src, dst, k) {
  if (src === dst) {
    return 0;
  }

  const routes = {};
  for (const [from, to, price] of flights) {
    if (!routes[from]) {
      routes[from] = [];
    }
    routes[from].push([to, price]);
  }

  const minStops = Array(n).fill(Infinity);
  const queue = new MyPriorityQueue((a, b) => a[1] - b[1]);
  queue.enqueue([src, 0, 0]);

  while (queue.size()) {
    const [from, fromPrice, fromStops] = queue.dequeue();

    if (fromStops > k + 1 || fromStops > minStops[from]) {
      continue;
    }
    minStops[from] = fromStops;

    if (from === dst) {
      return fromPrice;
    }

    if (!routes[from]) {
      continue;
    }

    for (const [to, priceTo] of routes[from]) {
      queue.enqueue([to, fromPrice + priceTo, fromStops + 1]);
    }
  }

  return -1;
};

// ======================================================
// Bellman-Ford Naiive
/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
var findCheapestPrice = function (n, flights, src, dst, k) {
  if (src === dst) {
    return 0;
  }

  let prev = Array(n).fill(Infinity);
  let curr = Array(n).fill(Infinity);
  prev[src] = 0;

  for (let stops = 0; stops <= k; stops++) {
    for (const flight of flights) {
      const [prevFlight, currFlight, cost] = flight;
      if (prev[prevFlight] < Infinity) {
        curr[currFlight] = Math.min(curr[currFlight],
          prev[prevFlight] + cost);
      }
    }

    prev = [...curr];
  }

  return curr[dst] === Infinity ? -1 : curr[dst];
};


// Bellman-Ford SPFA
/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
var findCheapestPrice = function (n, flights, src, dst, k) {
  if (src === dst) {
    return 0;
  }

  const pricesFrom = {};
  for (const flight of flights) {
    const [prevCity, currCity, cost] = flight;
    if (!pricesFrom[prevCity]) {
      pricesFrom[prevCity] = [];
    }
    pricesFrom[prevCity].push([currCity, cost]);
  }

  const minCost = Array(n).fill(Infinity);
  const queue = [[src, 0]];

  let stops = 0;
  while (stops <= k && queue.length) {
    let nextCitiesCount = queue.length;
    while (nextCitiesCount) {
      const [currCity, currCost] = queue.shift();
      nextCitiesCount--;

      if (!pricesFrom[currCity]) {
        continue;
      }

      for (const flight of pricesFrom[currCity]) {
        const [nextCity, nextCost] = flight;
        const totalPrice = currCost + nextCost;

        if (minCost[nextCity] > totalPrice) {
          minCost[nextCity] = totalPrice;
          queue.push([nextCity, minCost[nextCity]]);
        }
      }
    }

    stops++;
  }

  return minCost[dst] === Infinity ? -1 : minCost[dst];
};

// Dijktra
/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
var findCheapestPrice = function (n, flights, src, dst, k) {
  if (src === dst) {
    return 0;
  }

  const routes = {};
  for (const [from, to, price] of flights) {
    if (!routes[from]) {
      routes[from] = [];
    }
    routes[from].push([to, price]);
  }

  const minStops = Array(n).fill(Infinity);
  const queue = new MyPriorityQueue((a, b) => a[1] - b[1]);
  queue.enqueue([src, 0, 0]);

  while (queue.size()) {
    const [from, fromPrice, fromStops] = queue.dequeue();

    if (fromStops > k + 1 || fromStops > minStops[from]) {
      continue;
    }
    minStops[from] = fromStops;

    if (from === dst) {
      return fromPrice;
    }

    if (!routes[from]) {
      continue;
    }

    for (const [to, priceTo] of routes[from]) {
      queue.enqueue([to, fromPrice + priceTo, fromStops + 1]);
    }
  }

  return -1;
};

class MyPriorityQueue {
  constructor(comparator) {
    this.queue = new ArrayQueue(comparator);
    // this.queue = new LinkedList(comparator);
    // this.queue = new Heap(comparator);
  }

  size() {
    return this.queue.size();
  }

  peek() {
    return this.queue.peek();
  }

  enqueue(item) {
    this.queue.insert(item);
  }

  dequeue() {
    return this.queue.removeRoot();
  }
}

class ArrayQueue {
  constructor(comparator) {
    this.comparator = comparator;
    this.items = [];
    this.isDirty = false;
  }

  peek() {
    this.sortIfDirty();
    return this.items[this.items.length - 1];
  }

  size() {
    return this.items.length;
  }

  insert(item) {
    this.items.push(item);
    this.isDirty = true;
  }

  removeRoot() {
    this.sortIfDirty();
    return this.items.pop();
  }

  sortIfDirty() {
    if (this.isDirty) {
      this.items.sort((a, b) => -1 * this.comparator(a, b));
      this.isDirty = false;
    }
  }
}

class LinkedList {
  constructor(comparator) {
    this.comparator = comparator;
    this.head = null;
    this.length = 0;
  }

  peek() {
    return this.head?.val;
  }

  size() {
    return this.length;
  }

  removeRoot() {
    if (!this.head) {
      return null;
    }

    const node = this.head;
    this.head = this.head.next;

    this.length--;

    return node.val;
  }

  insert(item) {
    const node = new Node(item);
    if (!this.head || this.comparator(item, this.head.val) <= 0) {
      node.next = this.head;
      this.head = node;
    } else {
      let currNode = this.head;
      while (currNode.next && this.comparator(item, currNode.next.val) > 0) {
        currNode = currNode.next;
      }

      node.next = currNode.next;
      currNode.next = node;
    }
    this.length++;
  }
}

class Node {
  constructor(val, prev, next) {
    this.val = val;
    this.prev = prev ?? null;
    this.next = next ?? null;
  }
}

class Heap {
  constructor(comparator, nums) {
    this.comparator = comparator;
    this.nums = nums ?? [];
    this.build();
  }

  size() {
    return this.nums.length;
  }

  build() {
    for (let i = Math.floor(this.nums.length / 2) - 1; i >= 0; i--) {
      this.heapifyDown(i);
    }
  }

  peek() {
    return this.nums[0];
  }

  insert(val) {
    if (this.nums.length === this.sizeLimit) {
      if (!this.shouldSwap(this.nums[0], val)) {
        return;
      } else {
        this.nums[0] = val;
        this.heapifyDown(0);
      }
    } else {
      this.nums.push(val);
      this.heapifyUp(this.nums.length - 1);
    }
  }

  removeRoot() {
    this.swap(0, this.nums.length - 1);
    const item = this.nums.pop();

    this.heapifyDown(0);

    return item;
  }

  heapifyUp(targetIndex) {
    while (targetIndex) {
      const parentIndex = this.getParentIndex(targetIndex);
      if (this.shouldSwap(targetIndex, parentIndex)) {
        this.swap(targetIndex, parentIndex);
        targetIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  heapifyDown(targetIndex) {
    while (targetIndex < this.nums.length) {
      let swapIndex = targetIndex;
      swapIndex = this.getSwapIndex(1, targetIndex, swapIndex);
      swapIndex = this.getSwapIndex(2, targetIndex, swapIndex);

      if (swapIndex === targetIndex) {
        break;
      }

      this.swap(swapIndex, targetIndex);
      targetIndex = swapIndex;
    }
  }

  getSwapIndex(childNum, targetIndex, swapIndex) {
    const childIdx = targetIndex * 2 + childNum;

    return childIdx < this.nums.length
      && this.shouldSwap(childIdx, swapIndex) ? childIdx : swapIndex;
  }

  shouldSwap(childIdx, parentIdx) {
    return this.comparator(this.nums[childIdx], this.nums[parentIdx]) <= 0;
  }

  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }

  swap(i, j) {
    const temp = this.nums[i];
    this.nums[i] = this.nums[j];
    this.nums[j] = temp;
  }
}