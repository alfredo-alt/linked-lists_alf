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

  /**
   * @returns {*} the value of the first node in the list, or
   * `undefined` if the list is empty.
   */
  head() {
    return this.headNode ? this.headNode.value : undefined;
  }

  /**
   * @returns {*} the value of the last node in the list, or
   * `undefined` if the list is empty.
   */
  tail() {
    if (!this.headNode) {
      return undefined;
    }

    let current = this.headNode;
    while (current.nextNode) {
      current = current.nextNode;
    }
    return current.value;
  }

  /**
   * @param {number} index - zero-based position of the node to retrieve
   *   (index 0 is the head node, index 1 is the next one, and so on).
   * @returns {*} the value of the node at the specified index, or
   * `undefined` if the index is out of bounds.
   */
  at(index) {
    const current = this.getNodeAt(index);
    return current ? current.value : undefined;
  }

  /**
   * Removes the head node from the list and returns its value.
   * @returns {*} the value of the removed head node, or `undefined`
   * if the list was already empty.
   */
  pop() {
    if (!this.headNode) {
      return undefined;
    }

    const removedValue = this.headNode.value;
    // The second node in the chain becomes the new head. If there was
    // no second node, this.headNode.nextNode is already null, which
    // correctly leaves the list empty.
    this.headNode = this.headNode.nextNode;

    return removedValue;
  }

  /**
   * @param {*} value - the value to search for.
   * @returns {boolean} true if `value` is found anywhere in the list,
   * false otherwise.
   */
  contains(value) {
    let current = this.headNode;

    while (current) {
      if (current.value === value) {
        return true;
      }
      current = current.nextNode;
    }

    return false;
  }

  /**
   * @param {*} value - the value to search for.
   * @returns {number} the index of the first node containing `value`,
   * or `-1` if no node matches.
   */
  findIndex(value) {
    let current = this.headNode;
    let index = 0;

    while (current) {
      if (current.value === value) {
        return index;
      }
      current = current.nextNode;
      index += 1;
    }

    return -1;
  }

  /**
   * Represents the list as a string, e.g.
   * "( 1 ) -> ( 2 ) -> ( 3 ) -> null".
   * @returns {string} the string representation, or an empty string
   * if the list has no nodes.
   */
  toString() {
    if (!this.headNode) {
      return '';
    }

    let result = '';
    let current = this.headNode;

    while (current) {
      result += `( ${current.value} ) -> `;
      current = current.nextNode;
    }
    result += 'null';

    return result;
  }

  /**
   * Internal helper: walks the chain to find the actual Node object at
   * a given index (as opposed to `at()`, which returns just its value).
   * Used by methods like `insertAt` that need to attach new nodes
   * relative to an existing one.
   * @param {number} index - zero-based position of the node to retrieve
   *   (index 0 is the head node, index 1 is the next one, and so on).
   * @returns {Node|null} the node at the specified index, or `null` if
   * the index is out of bounds.
   */
  getNodeAt(index) {
    if (!this.headNode || index < 0) {
      return null;
    }

    let current = this.headNode;
    for (let i = 0; i < index; i += 1) {
      if (!current.nextNode) {
        return null;
      }
      current = current.nextNode;
    }
    return current;
  }

  /**
   * Inserts one or more values at the specified index in the list, in
   * the same order they're given.
   * @param {number} index - zero-based position where the new values
   *   should be inserted.
   * @param {...*} values - one or more values to insert into the list.
   * @throws {RangeError} if `index` is below 0 or above the list's size.
   */
  insertAt(index, ...values) {
    if (index === 0) {
      [...values].reverse().forEach((value) => this.prepend(value));
      return;
    }

    let current = this.getNodeAt(index - 1);

    if (!current) {
      throw new RangeError(`Index ${index} is out of bounds for insertAt.`);
    }

    values.forEach((value) => {
      const newNode = new Node(value, current.nextNode);
      current.nextNode = newNode;
      current = newNode;
    });
  }
}

export { Node, LinkedList };
