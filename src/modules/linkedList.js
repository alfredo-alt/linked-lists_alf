// linkedList.js
// Odin: Linked Lists project.

/**
 * A single node in the linked list. Holds one value and a reference to
 * the next node in the chain (or null if it's the last one).
 */
class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

/**
 * A singly linked list. Internally keeps a reference to the first node
 * (`headNode`); every other node is reached by following `nextNode`
 * references from there.
 */
class LinkedList {
  constructor() {
    this.headNode = null;
  }

  /**
   * Adds a new node containing `value` to the end of the list.
   * @param {*} value
   * @returns {LinkedList} this, so calls can be chained if desired.
   */
  append(value) {
    const newNode = new Node(value);

    // Empty list: the new node becomes the head.
    if (!this.headNode) {
      this.headNode = newNode;
      return this;
    }

    // Otherwise, walk to the last node (the one whose nextNode is null)
    // and attach the new node after it.
    let current = this.headNode;
    while (current.nextNode) {
      current = current.nextNode;
    }
    current.nextNode = newNode;

    return this;
  }

  /**
   * Adds a new node containing `value` to the start of the list.
   * @param {*} value
   * @returns {LinkedList} this, so calls can be chained if desired.
   */
  prepend(value) {
    // The new node's nextNode points to whatever was previously the
    // head (this works even when the list is empty, since headNode
    // would be null, which is exactly what an end-of-list node needs).
    const newNode = new Node(value, this.headNode);
    this.headNode = newNode;

    return this;
  }

  /**
   * @returns {number} the total number of nodes in the list.
   */
  size() {
    let count = 0;
    let current = this.headNode;

    // Walk the whole chain, counting one node per step, until we fall
    // off the end (nextNode === null).
    while (current) {
      count += 1;
      current = current.nextNode;
    }

    return count;
  }
}

export { Node, LinkedList };
