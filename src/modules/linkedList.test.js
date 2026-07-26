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
