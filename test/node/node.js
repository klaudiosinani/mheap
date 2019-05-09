'use strict';
const test = require('ava');
const {Node} = require('../../.');

test('key', t => {
  const node = new Node(10, 'A');
  t.is(node.key, 10);
});

test('value', t => {
  const node = new Node(10, 'A');
  t.is(node.value, 'A');
  node.value = 'B';
  t.is(node.value, 'B');
});

test('toPair', t => {
  const node = new Node(10, 'A');
  t.deepEqual(node.toPair(), [10, 'A']);
});
