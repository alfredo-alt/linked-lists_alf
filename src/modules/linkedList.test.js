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
    expect(list.tail()).toBe(2);
  });

  it('reflects the new last node after a prepend', () => {
    const list = new LinkedList();
    list.append(1);
    list.prepend(0);
    expect(list.tail()).toBe(1);
  });
});

describe('at functionality', () => {
  it('returns undefined for an empty list', () => {
    const list = new LinkedList();
    expect(list.at(0)).toBeUndefined();
  });

  it('returns the value of the node at the specified index', () => {
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    expect(list.at(0)).toBe(1);
    expect(list.at(1)).toBe(2);
    expect(list.at(2)).toBe(3);
  });

  it('returns undefined for an index out of bounds', () => {
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    expect(list.at(5)).toBeUndefined();
  });
});
