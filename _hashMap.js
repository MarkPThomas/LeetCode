class MaxHeap {
  size = 0;
  items = [];

  constructor(items = []) {
    if (Array.isArray(items)) {
      this.items = [...items];
    } else {
      this.items = [items];
    }
    this.size = this.items.length;

    const lastParentIndex = Math.floor(this.size / 2) - 1;

    for (let i = lastParentIndex; 0 <= i; i--) {
      this.heapifyDown(i);
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

  heapifyDown(startIndex = this.size - 1) {
    let targetIndex = Math.min(Math.max(0, startIndex), this.size - 1);

    while (targetIndex < this.size - 1) {
      let swapIndex = targetIndex;
      swapIndex = this.considerChildSwap(swapIndex, 1, targetIndex);
      swapIndex = this.considerChildSwap(swapIndex, 2, targetIndex);

      if (swapIndex === targetIndex) {
        break;
      } else {
        this.swap(targetIndex, swapIndex);
        targetIndex = swapIndex;
      }
    }
  }

  considerChildSwap(swapIndex, childNumber, targetIndex) {
    const childIndex = 2 * targetIndex + childNumber;

    return (childIndex <= this.size - 1 && this.shouldSwap(childIndex, swapIndex))
      ? childIndex
      : swapIndex;
  }

  heapifyUp(startIndex = this.size - 1) {
    let targetIndex = Math.min(Math.max(0, startIndex), this.size - 1);
    let parentIndex = this.getParentIndex(targetIndex);

    while (parentIndex >= 0 && this.shouldSwap(targetIndex, parentIndex)) {
      this.swap(targetIndex, parentIndex);

      targetIndex = parentIndex;
      parentIndex = this.getParentIndex(targetIndex);
    }
  }

  shouldSwap(indexChild, indexParent) {
    return this.items[indexChild] > this.items[indexParent];
  }

  swap(i, j) {
    const temp = this.items[i];
    this.items[i] = this.items[j];
    this.items[j] = temp;
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }
}