// 2025/05/13
// O() time complexity
// O() space complexity
// Time to complete: 34:53 min
// Patterns: Doubly Linked List
// Notes w.r.t. solution: Solved in 27:33, but took 3 more min to optimize get method.
//  This is time on top of making the singly linked list
var MyLinkedList = function () {
  this.size = 0;
  this.head = { val: null, prev: null, next: null };
  this.tail = { val: null, prev: null, next: null };

  this.head.next = this.tail;
  this.tail.prev = this.head;
};

MyLinkedList.prototype.getNode = function (index) {
  if (index < 0 || this.size < index) {
    return null;
  }

  if (index === this.size) {
    return this.tail;
  }

  let count = 0;
  let node = null;
  if (index < this.size / 2) {
    node = this.head.next;
    while (node && count < index) {
      node = node.next;
      count++;
    }
  } else {
    node = this.tail.prev;
    while (node && count < this.size - index - 1) {
      node = node.prev;
      count++;
    }
  }

  return node;
};

/**
* @param {number} index
* @return {number}
*/
MyLinkedList.prototype.get = function (index) {
  const node = this.getNode(index);
  return (node && node.val !== null) ? node.val : -1;
};

/**
* @param {number} val
* @return {void}
*/
MyLinkedList.prototype.addAtHead = function (val) {
  this.addAtIndex(0, val);
};

/**
* @param {number} val
* @return {void}
*/
MyLinkedList.prototype.addAtTail = function (val) {
  this.addAtIndex(this.size, val);
};

MyLinkedList.prototype.getPrevNode = function (index) {
  return (index === 0)
    ? this.head
    : index === this.size
      ? this.tail.prev
      : this.getNode(index - 1);
}

/**
* @param {number} index
* @param {number} val
* @return {void}
*/
MyLinkedList.prototype.addAtIndex = function (index, val) {
  if (index < 0 || this.size < index) {
    return;
  }

  const node = { val, prev: null, next: null }

  let prevNode = this.getPrevNode(index);
  if (prevNode) {
    node.next = prevNode.next;
    node.prev = prevNode;

    prevNode.next = node;
    if (node.next) {
      node.next.prev = node;
    }

    this.size++;
  }
};

/**
* @param {number} index
* @return {void}
*/
MyLinkedList.prototype.deleteAtIndex = function (index) {
  if (index < 0 || this.size <= index) {
    return;
  }

  let prevNode = this.getPrevNode(index);
  if (prevNode) {
    const deleteNode = prevNode.next;
    prevNode.next = deleteNode.next;
    if (deleteNode.next) {
      deleteNode.next.prev = prevNode;
    }

    deleteNode.next = null;
    deleteNode.prev = null;

    this.size--;
  }
};

/**
* Your MyLinkedList object will be instantiated and called as such:
* var obj = new MyLinkedList()
* var param_1 = obj.get(index)
* obj.addAtHead(val)
* obj.addAtTail(val)
* obj.addAtIndex(index,val)
* obj.deleteAtIndex(index)
*/

// 2025/05/13
// O() time complexity
// O() space complexity
// Time to complete: 20:04 min
// Patterns: Singly Linked List
// Notes w.r.t. solution:
var MyLinkedList = function () {
  this.size = 0;
  this.head = { next: null }
};

MyLinkedList.prototype.getNode = function (index) {
  if (index < 0 || this.size <= index) {
    return null;
  }

  let node = this.head.next;
  while (node && 0 < index) {
    node = node.next;
    index--;
  }

  return node;
};

/**
* @param {number} index
* @return {number}
*/
MyLinkedList.prototype.get = function (index) {
  const node = this.getNode(index);
  return node ? node.val : -1;
};

/**
* @param {number} val
* @return {void}
*/
MyLinkedList.prototype.addAtHead = function (val) {
  this.addAtIndex(0, val);
};

/**
* @param {number} val
* @return {void}
*/
MyLinkedList.prototype.addAtTail = function (val) {
  this.addAtIndex(this.size, val);
};

/**
* @param {number} index
* @param {number} val
* @return {void}
*/
MyLinkedList.prototype.addAtIndex = function (index, val) {
  if (index < 0 || this.size < index) {
    return;
  }

  const node = { val, next: null }

  let prevNode = (index === 0) ? this.head : this.getNode(index - 1);

  if (prevNode) {
    node.next = prevNode.next;
    prevNode.next = node;
    this.size++;
  }
};

/**
* @param {number} index
* @return {void}
*/
MyLinkedList.prototype.deleteAtIndex = function (index) {
  if (index < 0 || this.size <= index) {
    return;
  }

  let prevNode = (index === 0) ? this.head : this.getNode(index - 1);

  if (prevNode) {
    const deleteNode = prevNode.next;
    prevNode.next = deleteNode.next;
    deleteNode.next = null;
    this.size--;
  }
};

/**
* Your MyLinkedList object will be instantiated and called as such:
* var obj = new MyLinkedList()
* var param_1 = obj.get(index)
* obj.addAtHead(val)
* obj.addAtTail(val)
* obj.addAtIndex(index,val)
* obj.deleteAtIndex(index)
*/


// 2025/05/12
// O() time complexity
// O() space complexity
// Time to complete: 42:21 min
// Patterns: Singly Linked List
// Notes w.r.t. solution: Worked out in 14:42 min (passing) but minor bugs took time to debug.
//  Using sentinel nodes &  more generic insert methods would help with this
//  Also, tail adds more complexity. Solve naiively first w/o, then add it for doubly-linked list.
var MyLinkedList = function () {
  this.head = null;
  this.tail = null;
  this.size = 0;
};

MyLinkedList.prototype.getNode = function (index) {
  let node = this.head;
  for (let i = 0; i < index; i++) {
    node = node.next;

    if (!node) {
      break;
    }
  }

  return node;
}

/**
* @param {number} index
* @return {number}
*/
MyLinkedList.prototype.get = function (index) {
  let node = this.getNode(index);

  return node ? node.val : -1;
};

/**
* @param {number} val
* @return {void}
*/
MyLinkedList.prototype.addAtHead = function (val) {
  const node = { val, next: this.head };
  this.head = node;

  if (this.size === 0) {
    this.tail = this.head;
  }

  this.size++;
};

/**
* @param {number} val
* @return {void}
*/
MyLinkedList.prototype.addAtTail = function (val) {
  if (this.size === 0) {
    return this.addAtHead(val);
  }

  const node = { val, next: null };
  this.tail.next = node;
  this.tail = node;

  this.size++;
};

/**
* @param {number} index
* @param {number} val
* @return {void}
*/
MyLinkedList.prototype.addAtIndex = function (index, val) {
  if (index > this.size) {
    return;
  }

  if (index === 0) {
    return this.addAtHead(val);
  }

  if (index === this.size) {
    return this.addAtTail(val);
  }

  // add at just before index
  let node = this.getNode(index - 1);
  if (node) {
    const insertNode = { val, next: node.next };
    node.next = insertNode;

    this.size++;
  }
};

/**
* @param {number} index
* @return {void}
*/
MyLinkedList.prototype.deleteAtIndex = function (index) {
  if (index >= this.size) {
    return;
  }

  // Remove last node
  if (this.size === 1) {
    this.head = null;
    this.tail = null;
    this.size--;

    return;
  }

  if (index === 0) {
    const deleteNode = this.head;
    this.head = this.head.next;
    deleteNode.next = null;

    this.size--;
  } else {
    // remove at index by getting node just before
    let node = this.getNode(index - 1);
    if (node) {
      const deleteNode = node.next;
      node.next = deleteNode ? deleteNode.next : null;

      if (deleteNode) {
        deleteNode.next = null;
      }

      // Removed tail
      if (index === this.size - 1) {
        this.tail = node;
      }

      this.size--;
    }
  }

  // If removed to single node...
  if (this.size === 1) {
    this.head = this.tail;
  }
};

/**
* Your MyLinkedList object will be instantiated and called as such:
* var obj = new MyLinkedList()
* var param_1 = obj.get(index)
* obj.addAtHead(val)
* obj.addAtTail(val)
* obj.addAtIndex(index,val)
* obj.deleteAtIndex(index)
*/