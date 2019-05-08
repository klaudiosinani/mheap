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

  extract(index) {
    const node = this._data[index];
    this.remove(index);
    return node;
  }

  extractMin() {
    return this.extract(0);
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

  remove(index) {
    if (index >= 0 && index < this.size) {
      if (index === this.size - 1) {
        this._data.pop();
      } else {
        let currentIndex = index;
        this._data[currentIndex] = this._data.pop();

        while (!this._isMinOrdered(currentIndex)) {
          const minIndex = this.minChildIndex(currentIndex);
          this._swap(currentIndex, minIndex);
          currentIndex = minIndex;
        }
      }
    }

    return this;
  }
}

module.exports = Min;
