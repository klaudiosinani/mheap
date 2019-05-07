'use strict';
const Heap = require('./heap');
const Node = require('./node');

class Max extends Heap {
  _isMaxOrdered(index) {
    const indices = this.childrenIndices(index);

    for (const i in indices) {
      if (this._compare(index, indices[i]) < 0) {
        return false;
      }
    }

    return true;
  }

  extractMax() {
    if (this.size <= 1) {
      return this._data.shift();
    }

    const {root: max} = this;
    this._data[0] = this._data.pop();

    let index = 0;

    while (!this._isMaxOrdered(index)) {
      const maxIndex = this.maxChildIndex(index);
      this._swap(index, maxIndex);
      index = maxIndex;
    }

    return max;
  }

  insert(key, value) {
    const node = new Node(key, value);
    this._data.push(node);

    let index = this.size - 1;
    let parentIndex = this.parentIndex(index);

    while (parentIndex >= 0 && this._compare(index, parentIndex) > 0) {
      this._swap(index, parentIndex);
      index = parentIndex;
      parentIndex = this.parentIndex(index);
    }

    return this;
  }
}

module.exports = Max;
