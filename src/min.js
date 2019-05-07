'use strict';
const Heap = require('./heap');
const Node = require('./node');

class Min extends Heap {
  _isMinOrdered(index) {
    const indices = this.childrenIndices(index);

    for (const i in indices) {
      if (this._compare(index, indices[i]) > 0) {
        return false;
      }
    }

    return true;
  }

  insert(key, value) {
    const node = new Node(key, value);
    this._data.push(node);

    let index = this.size - 1;
    let parentIndex = this.parentIndex(index);

    while (parentIndex >= 0 && this._compare(index, parentIndex) < 0) {
      this._swap(index, parentIndex);
      index = parentIndex;
      parentIndex = this.parentIndex(index);
    }

    return this;
  }
}

module.exports = Min;
