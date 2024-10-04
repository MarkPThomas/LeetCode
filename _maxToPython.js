class heapq {
  size = 0;
  items = [];
  comparator = (child, parent) => child > parent;

  constructor(items = [], comparator = null) {
    if (comparator) {
      this.comparator = comparator;
    }

    if (Array.isArray(items)) {
      this.items = [...items];
    } else {
      this.items = [items];
    }
    this.size = this.items.length;

    const lastParentIndex = Math.floor(this.size / 2) - 1;

    for (let i = lastParentIndex; 0 <= i; i--) {
      MaxHeap.heapifyDown(i);
    }
  }

  insert(score) {
    const targetIndex = this.items.push(score) - 1;
    this.size++;

    this.heapifyUp(targetIndex);

    return this.size;
  }

  remove() {
    let val = this.items[0];

    this.swap(0, this.size - 1);
    this.size--;
    this.heapifyDown(0);

    return val;
  }





  // Work out how to consider size
  static heapify(items, comparator = null, size = items.length) {
    const lastParentIndex = Math.floor(size / 2) - 1;

    for (let i = lastParentIndex; 0 <= i; i--) {
      heapq.heapifyDown(i, items, comparator, size);
    }
  }

  // Work out how to consider size
  static heappush(items, value) {
    const targetIndex = items.push(value) - 1;
    this.size++;

    heapq.heapifyUp(targetIndex);

    return this.size;
  }

  // Work out how to consider size
  static heappop(items, size = items.length) {
    let val = items[0];

    heapq.swap(0, size - 1, items);
    this.size--;
    heapq.heapifyDown(0);

    return val;
  }

  // Work out how to consider size
  static heapifyDown(items, comparator = null, startIndex = items.length - 1, size = items.length) {
    let targetIndex = Math.min(Math.max(0, startIndex), size - 1);

    while (targetIndex < size) {
      let swapIndex = targetIndex;
      swapIndex = heapq.considerChildSwap(swapIndex, 1, targetIndex, items, comparator, size);
      swapIndex = heapq.considerChildSwap(swapIndex, 2, targetIndex, items, comparator, size);

      if (swapIndex === targetIndex) {
        break;
      } else {
        heapq.swap(targetIndex, swapIndex, items);
        targetIndex = swapIndex;
      }
    }
  }

  // Work out how to consider size
  static heapifyUp(items, comparator = null, startIndex = items.length - 1, size = items.length) {
    let targetIndex = Math.min(Math.max(0, startIndex), size - 1);
    let parentIndex = heapq.getParentIndex(targetIndex);

    while (parentIndex >= 0 && heapq.shouldSwap(targetIndex, parentIndex, items, comparator)) {
      heapq.swap(targetIndex, parentIndex, items);

      targetIndex = parentIndex;
      parentIndex = heapq.getParentIndex(targetIndex);
    }
  }

  // Work out how to consider size
  static considerChildSwap(swapIndex, childNumber, targetIndex, items, comparator = null, size = items.length) {
    const childIndex = 2 * targetIndex + childNumber;

    return (childIndex < size - 1 && heapq.shouldSwap(childIndex, swapIndex, items, comparator))
      ? childIndex
      : swapIndex;
  }

  static shouldSwap(indexChild, indexParent, items, comparator = null) {
    if (!comparator) {
      comparator = (a, b) => a <= b;
    }

    return comparator(items[indexChild], items[indexParent]);
  }

  static swap(i, j, items) {
    const temp = items[i];
    items[i] = items[j];
    items[j] = temp;
  }

  static getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }
}