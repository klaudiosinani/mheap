'use strict';
const Heap = require('./heap');

class Max extends Heap {
  _areOrdered(parentIndex, childIndex) {
    return this._data[parentIndex].key - this._data[childIndex].key > 0;
  }
}

module.exports = Max;
