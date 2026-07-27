// linkedList.test.js
// Odin: Linked Lists project.

import { LinkedList } from './linkedList.js';

describe('append functionality', () => {
  it('sets the first appended value as the head of an empty list', () => {
    const list = new LinkedList();
    list.append(1);
    expect(list.headNode.value).toBe(1);
  });

  it('chains multiple appended values in the order they were added', () => {
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    list.append(3);

    // Walk the chain manually to confirm the order and the final null.
    expect(list.headNode.value).toBe(1);
    expect(list.headNode.nextNode.value).toBe(2);
    expect(list.headNode.nextNode.nextNode.value).toBe(3);
    expect(list.headNode.nextNode.nextNode.nextNode).toBeNull();
  });
});

describe('prepend functionality', () => {
  it('sets the value as the head of an empty list', () => {
    const list = new LinkedList();
    list.prepend(1);
    expect(list.headNode.value).toBe(1);
  });

  it('adds new values to the start, pushing the old head backwards', () => {
    const list = new LinkedList();
    list.append(2);
    list.append(3);
    list.prepend(1);

    expect(list.headNode.value).toBe(1);
    expect(list.headNode.nextNode.value).toBe(2);
    expect(list.headNode.nextNode.nextNode.value).toBe(3);
    expect(list.headNode.nextNode.nextNode.nextNode).toBeNull();
  });
});

describe('size functionality', () => {
  it('returns 0 for an empty list', () => {
    const list = new LinkedList();
    expect(list.size()).toBe(0);
  });

  it('returns the correct count after several appends', () => {
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    expect(list.size()).toBe(3);
  });

  it('counts nodes added with prepend as well', () => {
    const list = new LinkedList();
    list.append(1);
    list.prepend(0);
    expect(list.size()).toBe(2);
  });
});

describe('head functionality', () => {
  it('returns undefined for an empty list', () => {
    const list = new LinkedList();
    expect(list.head()).toBeUndefined();
  });

  it('returns the value of the first node after appends', () => {
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    expect(list.head()).toBe(1);
  });

  it('reflects the new first node after a prepend', () => {
    const list = new LinkedList();
    list.append(1);
    list.prepend(0);
    expect(list.head()).toBe(0);
  });
});

describe('tail functionality', () => {
  it('returns undefined for an empty list', () => {
    const list = new LinkedList();
    expect(list.tail()).toBeUndefined();
  });

  it('returns the value of the last node after appends', () => {
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    expect(list.tail()).toBe(3);
  });

  it('returns the only value when the list has a single node', () => {
    const list = new LinkedList();
    list.append(1);
    expect(list.tail()).toBe(1);
  });
});

describe('at functionality', () => {
  it('returns undefined for an empty list, regardless of index', () => {
    const list = new LinkedList();
    expect(list.at(0)).toBeUndefined();
  });

  it('returns the value at each valid index', () => {
    const list = new LinkedList();
    list.append('a');
    list.append('b');
    list.append('c');
    expect(list.at(0)).toBe('a');
    expect(list.at(1)).toBe('b');
    expect(list.at(2)).toBe('c');
  });

  it('returns undefined when the index is out of bounds', () => {
    const list = new LinkedList();
    list.append('a');
    list.append('b');
    expect(list.at(5)).toBeUndefined();
  });
});

describe('pop functionality', () => {
  it('returns undefined when popping an empty list', () => {
    const list = new LinkedList();
    expect(list.pop()).toBeUndefined();
  });

  it('removes and returns the head value', () => {
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    list.append(3);

    expect(list.pop()).toBe(1);
    expect(list.head()).toBe(2);
    expect(list.size()).toBe(2);
  });

  it('leaves the list empty after popping its only node', () => {
    const list = new LinkedList();
    list.append(1);
    list.pop();

    expect(list.size()).toBe(0);
    expect(list.head()).toBeUndefined();
  });
});

describe('contains functionality', () => {
  it('returns false for an empty list', () => {
    const list = new LinkedList();
    expect(list.contains(1)).toBe(false);
  });

  it('returns true when the value is present', () => {
    const list = new LinkedList();
    list.append('a');
    list.append('b');
    expect(list.contains('b')).toBe(true);
  });

  it('returns false when the value is not present', () => {
    const list = new LinkedList();
    list.append('a');
    list.append('b');
    expect(list.contains('z')).toBe(false);
  });
});

describe('findIndex functionality', () => {
  it('returns -1 for an empty list', () => {
    const list = new LinkedList();
    expect(list.findIndex('a')).toBe(-1);
  });

  it('returns the index of the matching value', () => {
    const list = new LinkedList();
    list.append('a');
    list.append('b');
    list.append('c');
    expect(list.findIndex('c')).toBe(2);
  });

  it('returns -1 when the value is not found', () => {
    const list = new LinkedList();
    list.append('a');
    expect(list.findIndex('z')).toBe(-1);
  });

  it('returns the index of the FIRST match when there are duplicates', () => {
    const list = new LinkedList();
    list.append('a');
    list.append('b');
    list.append('a');
    expect(list.findIndex('a')).toBe(0);
  });
});

describe('toString functionality', () => {
  it('returns an empty string for an empty list', () => {
    const list = new LinkedList();
    expect(list.toString()).toBe('');
  });

  it('formats a single-node list correctly', () => {
    const list = new LinkedList();
    list.append(1);
    expect(list.toString()).toBe('( 1 ) -> null');
  });

  it('formats a multi-node list correctly', () => {
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    expect(list.toString()).toBe('( 1 ) -> ( 2 ) -> ( 3 ) -> null');
  });
});

describe('getNodeAt functionality', () => {
  it('returns null for an empty list', () => {
    const list = new LinkedList();
    expect(list.getNodeAt(0)).toBeNull();
  });

  it('returns the actual Node object at a valid index', () => {
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    const node = list.getNodeAt(1);
    expect(node.value).toBe(2);
  });

  it('returns null for a negative index', () => {
    const list = new LinkedList();
    list.append(1);
    expect(list.getNodeAt(-1)).toBeNull();
  });

  it('returns null for an out-of-bounds index', () => {
    const list = new LinkedList();
    list.append(1);
    expect(list.getNodeAt(5)).toBeNull();
  });
});

describe('insertAt functionality', () => {
  it('inserts a single value in the middle, matching the assignment example', () => {
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    list.append(3);

    list.insertAt(1, 10, 11);

    expect(list.toString()).toBe(
      '( 1 ) -> ( 10 ) -> ( 11 ) -> ( 2 ) -> ( 3 ) -> null',
    );
  });

  it('inserts multiple values at index 0, preserving the given order', () => {
    const list = new LinkedList();
    list.append(1);

    list.insertAt(0, 10, 11);

    expect(list.toString()).toBe('( 10 ) -> ( 11 ) -> ( 1 ) -> null');
  });

  it('inserts at the end of the list when index equals the current size', () => {
    const list = new LinkedList();
    list.append(1);
    list.append(2);

    list.insertAt(2, 3);

    expect(list.toString()).toBe('( 1 ) -> ( 2 ) -> ( 3 ) -> null');
  });

  it('throws a RangeError when the index is negative', () => {
    const list = new LinkedList();
    list.append(1);

    expect(() => list.insertAt(-1, 99)).toThrow(RangeError);
  });

  it('throws a RangeError when the index is above the list size', () => {
    const list = new LinkedList();
    list.append(1);

    expect(() => list.insertAt(5, 99)).toThrow(RangeError);
  });
});
