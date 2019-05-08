'use strict';
const MaxHeap = require('./src/max');
const MinHeap = require('./src/min');
const Node = require('./src/node');

module.exports = Object.assign({}, {MaxHeap}, {MinHeap}, {Node});
