'use strict';
const Heap = require('./heap');
const Node = require('./node');

class Min extends Heap {
  _areOrdered(parentIndex, childIndex) {
    return this._data[parentIndex].key - this._data[childIndex].key < 0;
  }

  insert(key, value) {
    const node = new Node(key, value);
    this._data.push(node);

    let index = this.size - 1;
    let parentIndex = this.parentIndex(index);

    while (parentIndex >= 0 && !this._areOrdered(parentIndex, index)) {
      this._swap(parentIndex, index);
      index = parentIndex;
      parentIndex = this.parentIndex(index);
    }

    return this;
  }
}

module.exports = Min;
