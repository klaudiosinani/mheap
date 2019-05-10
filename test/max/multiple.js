'use strict';
const test = require('ava');
const {MaxHeap, Node} = require('../../.');

const heap = new MaxHeap();

test('insert', t => {
  heap.insert(15, 'A').insert(10, 'B').insert(5, 'C').insert(7, 'D');
  t.deepEqual(heap._data[0], new Node(15, 'A'));
  t.deepEqual(heap._data[1], new Node(10, 'B'));
  t.deepEqual(heap._data[2], new Node(5, 'C'));
  t.deepEqual(heap._data[3], new Node(7, 'D'));
});

test('root', t => {
  t.deepEqual(heap.root, new Node(15, 'A'));
});

test('size', t => {
  t.is(heap.size, 4);
});

test('toPairs', t => {
  t.deepEqual(heap.toPairs(), [[15, 'A'], [10, 'B'], [5, 'C'], [7, 'D']]);
});

test('childIndices', t => {
  t.deepEqual(heap.childIndices(0), {left: 1, right: 2});
  t.deepEqual(heap.childIndices(1), {left: 3});
  t.deepEqual(heap.childIndices(2), {});
});

test('children', t => {
  t.deepEqual(heap.children(0), {left: new Node(10, 'B'), right: new Node(5, 'C')});
  t.deepEqual(heap.children(1), {left: new Node(7, 'D')});
  t.deepEqual(heap.children(2), {});
});

test('clear', t => {
  t.deepEqual(heap.clear(), new MaxHeap());
  t.is(heap.root, undefined);
  t.is(heap.size, 0);
  heap.insert(15, 'A').insert(10, 'B').insert(5, 'C').insert(7, 'D');
});

test('degree', t => {
  t.is(heap.degree(0), 2);
  t.is(heap.degree(1), 1);
  t.is(heap.degree(2), 0);
});

test('extract', t => {
  t.deepEqual(heap.extract(0), new Node(15, 'A'));
  t.deepEqual(heap.size, 3);
  t.deepEqual(heap.toPairs(), [[10, 'B'], [7, 'D'], [5, 'C']]);
  heap.clear().insert(15, 'A').insert(10, 'B').insert(5, 'C').insert(7, 'D');
});

test('extractMax', t => {
  t.deepEqual(heap.extractMax(), new Node(15, 'A'));
  t.deepEqual(heap.size, 3);
  t.deepEqual(heap.toPairs(), [[10, 'B'], [7, 'D'], [5, 'C']]);
  heap.clear().insert(15, 'A').insert(10, 'B').insert(5, 'C').insert(7, 'D');
});

test('fullNodes', t => {
  t.deepEqual(heap.fullNodes(), [new Node(15, 'A')]);
});

test('height', t => {
  t.is(heap.height(), 2);
});

test('includes', t => {
  t.true(heap.includes(15));
  t.true(heap.includes(5));
  t.false(heap.includes(17));
});

test('indexOf', t => {
  t.is(heap.indexOf(15), 0);
  t.is(heap.indexOf(5), 2);
  t.is(heap.indexOf(17), -1);
});

test('internalNodes', t => {
  t.deepEqual(heap.internalNodes(), [new Node(15, 'A'), new Node(10, 'B')]);
});

test('isEmpty', t => {
  t.false(heap.isEmpty());
});

test('isFullNode', t => {
  t.true(heap.isFullNode(0));
  t.false(heap.isFullNode(1));
  t.false(heap.isFullNode());
});

test('isInternalNode', t => {
  t.true(heap.isInternalNode(0));
  t.true(heap.isInternalNode(1));
  t.false(heap.isInternalNode(2));
});

test('isLeafNode', t => {
  t.false(heap.isLeafNode(0));
  t.false(heap.isLeafNode(1));
  t.true(heap.isLeafNode(2));
  t.true(heap.isLeafNode(3));
});

test('isPartialNode', t => {
  t.false(heap.isPartialNode(0));
  t.true(heap.isPartialNode(1));
  t.false(heap.isPartialNode(2));
});

test('keys', t => {
  t.deepEqual(heap.keys(), [15, 10, 5, 7]);
});

test('leafNodes', t => {
  const leaves = heap.leafNodes();
  t.deepEqual(leaves, [new Node(5, 'C'), new Node(7, 'D')]);
});

test('left', t => {
  t.deepEqual(heap.left(0), new Node(10, 'B'));
  t.deepEqual(heap.left(1), new Node(7, 'D'));
  t.is(heap.left(2), undefined);
});

test('leftIndex', t => {
  t.is(heap.leftIndex(0), 1);
  t.is(heap.leftIndex(1), 3);
  t.is(heap.leftIndex(2), 5);
});

test('levelOrder', t => {
  const array = [];
  heap.levelOrder(x => array.push(x));
  t.deepEqual(array, [new Node(15, 'A'), new Node(10, 'B'), new Node(5, 'C'), new Node(7, 'D')]);
});

test('maxChild', t => {
  t.deepEqual(heap.maxChild(0), new Node(10, 'B'));
  t.deepEqual(heap.maxChild(1), new Node(7, 'D'));
  t.is(heap.maxChild(2), undefined);
});

test('maxChildIndex', t => {
  t.is(heap.maxChildIndex(0), 1);
  t.is(heap.maxChildIndex(1), 3);
  t.is(heap.maxChildIndex(2), -1);
});

test('minChild', t => {
  t.deepEqual(heap.minChild(0), new Node(5, 'C'));
  t.deepEqual(heap.minChild(1), new Node(7, 'D'));
  t.is(heap.minChild(2), undefined);
});

test('minChildIndex', t => {
  t.is(heap.minChildIndex(0), 2);
  t.is(heap.minChildIndex(1), 3);
  t.is(heap.minChildIndex(2), -1);
});

test('node', t => {
  t.deepEqual(heap.node(0), new Node(15, 'A'));
  t.deepEqual(heap.node(0), heap.root);
  t.deepEqual(heap.node(1), new Node(10, 'B'));
  t.deepEqual(heap.node(2), new Node(5, 'C'));
  t.deepEqual(heap.node(3), new Node(7, 'D'));
  t.is(heap.node(4), undefined);
});

test('parent', t => {
  t.is(heap.parent(0), undefined);
  t.deepEqual(heap.parent(1), new Node(15, 'A'));
  t.deepEqual(heap.parent(2), new Node(15, 'A'));
  t.deepEqual(heap.parent(3), new Node(10, 'B'));
});

test('parentIndex', t => {
  t.is(heap.parentIndex(0), -1);
  t.is(heap.parentIndex(1), 0);
  t.is(heap.parentIndex(2), 0);
  t.is(heap.parentIndex(3), 1);
});

test('partialNodes', t => {
  t.deepEqual(heap.partialNodes(), [new Node(10, 'B')]);
});

test('remove', t => {
  t.deepEqual(heap.remove(0).toPairs(), [[10, 'B'], [7, 'D'], [5, 'C']]);
  t.deepEqual(heap.root, new Node(10, 'B'));
  t.is(heap.size, 3);
  t.deepEqual(heap.remove(2).node(1), new Node(7, 'D'));
  heap.clear().insert(15, 'A').insert(15, 'B').insert(15, 'C').insert(15, 'D');
  t.deepEqual(heap.remove(0).root, new Node(15, 'D'));
  heap.clear().insert(15, 'A').insert(10, 'B').insert(5, 'C').insert(7, 'D');
});

test('right', t => {
  t.deepEqual(heap.right(0), new Node(5, 'C'));
  t.deepEqual(heap.right(1), undefined);
  t.is(heap.right(2), undefined);
});

test('rightIndex', t => {
  t.is(heap.rightIndex(0), 2);
  t.is(heap.rightIndex(1), 4);
  t.is(heap.rightIndex(2), 6);
});

test('search', t => {
  t.deepEqual(heap.search(15), heap.root);
  t.deepEqual(heap.search(15), new Node(15, 'A'));
  t.deepEqual(heap.search(7), new Node(7, 'D'));
});

test('toArray', t => {
  heap.clear().insert(15, 'A').insert(10, 'B').insert(5, 'C').insert(7, 'D').insert(15, 'E');
  t.deepEqual(heap.toArray(), [new Node(15, 'A'), new Node(15, 'E'), new Node(5, 'C'), new Node(7, 'D'), new Node(10, 'B')]);
});

test('update', t => {
  t.deepEqual(heap.update(7, 'd').node(3), new Node(7, 'd'));
  t.deepEqual(heap.update(7, 'D').node(3), new Node(7, 'D'));
});

test('values', t => {
  t.deepEqual(heap.values(), ['A', 'E', 'C', 'D', 'B']);
});
