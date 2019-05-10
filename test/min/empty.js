'use strict';
const test = require('ava');
const {MinHeap} = require('../../.');

const heap = new MinHeap();

test('root', t => {
  t.is(heap.root, undefined);
});

test('size', t => {
  t.is(heap.size, 0);
});

test('clear', t => {
  t.deepEqual(heap.clear(), heap);
});

test('extract', t => {
  t.is(heap.extract(1), undefined);
  t.deepEqual(heap, heap);
});

test('extractMin', t => {
  t.is(heap.extractMin(), undefined);
  t.deepEqual(heap, heap);
});

test('fullNodes', t => {
  t.deepEqual(heap.fullNodes(), []);
});

test('height', t => {
  t.is(heap.height(), -1);
});

test('includes', t => {
  t.false(heap.includes(10));
});

test('indexOf', t => {
  t.is(heap.indexOf(10), -1);
});

test('internalNodes', t => {
  t.deepEqual(heap.internalNodes(), []);
});

test('isEmpty', t => {
  t.true(heap.isEmpty());
});

test('keys', t => {
  t.deepEqual(heap.keys(), []);
});

test('leafNodes', t => {
  t.deepEqual(heap.leafNodes(), []);
});

test('levelOrder', t => {
  const array = [];
  heap.levelOrder(x => array.push(x));
  t.deepEqual(array, []);
});

test('node', t => {
  t.is(heap.node(0), undefined);
});

test('partialNodes', t => {
  t.deepEqual(heap.partialNodes(), []);
});

test('remove', t => {
  t.deepEqual(heap.remove(10), heap);
});

test('search', t => {
  t.is(heap.search(10), undefined);
});

test('toArray', t => {
  t.deepEqual(heap.toArray(), []);
});

test('toPairs', t => {
  t.deepEqual(heap.toPairs(), []);
});

test('update', t => {
  t.deepEqual(heap.update(0, 'A'), heap);
});

test('values', t => {
  t.deepEqual(heap.values(), []);
});
