'use strict';
const Heap = require('./heap');
const Node = require('./node');

class Max extends Heap {
  _isMaxOrdered(index) {
    const indices = this.childrenIndices(index);

    Object.keys(indices).forEach(x => {
      if (this._compare(index, indices[x]) < 0) {
        return false;
      }
    });

    return true;
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

module.exports = Max;
