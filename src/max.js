'use strict';
const Heap = require('./heap');
const Node = require('./node');

class MaxHeap extends Heap {
  _isMaxOrdered(index) {
    const indices = this.childIndices(index);

    for (const i in indices) {
      if (this._compare(index, indices[i]) < 0) {
        return false;
      }
    }

    return true;
  }

  extract(index) {
    const node = this._data[index];
    this.remove(index);
    return node;
  }

  extractMax() {
    return this.extract(0);
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

  remove(index) {
    if (index >= 0 && index < this.size) {
      if (index === this.size - 1) {
        this._data.pop();
      } else {
        let currentIndex = index;
        this._data[currentIndex] = this._data.pop();

        while (!this._isMaxOrdered(currentIndex)) {
          const maxIndex = this.maxChildIndex(currentIndex);
          this._swap(currentIndex, maxIndex);
          currentIndex = maxIndex;
        }
      }
    }

    return this;
  }
}

module.exports = MaxHeap;
