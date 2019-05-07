'use strict';

class Heap {
  constructor() {
    this._data = [];
  }

  get root() {
    return this._data[0];
  }

  get size() {
    return this._data.length;
  }

  _compare(i, j) {
    const [x, y] = [this._data[i], this._data[j]];

    if (x.key > y.key) {
      return 1;
    }

    if (x.key < y.key) {
      return -1;
    }

    return 0;
  }

  _swap(x, y) {
    [this._data[x], this._data[y]] = [this._data[y], this._data[x]];
  }

  children(index) {
    const children = {};
    const indices = this.childrenIndices(index);

    Object.keys(indices).forEach(index => {
      children[index] = this.node(indices[index]);
    });

    return children;
  }

  childrenIndices(index) {
    const indices = {};
    const left = this.leftIndex(index);
    const right = this.rightIndex(index);

    if (left < this.size) {
      indices.left = left;
    }

    if (right < this.size) {
      indices.right = right;
    }

    return indices;
  }

  clear() {
    this._data = [];
    return this;
  }

  degree(index) {
    return Object.keys(this.children(index)).length;
  }

  fullNodes() {
    const nodes = [];

    this._data.forEach((node, index) => {
      if (this.isFullNode(index)) {
        nodes.push(node);
      }
    });

    return nodes;
  }

  height() {
    return Math.ceil(Math.log2(this.size + 1)) - 1;
  }

  includes(key) {
    for (const node of this._data) {
      if (node.key === key) {
        return true;
      }
    }

    return false;
  }

  indexOf(key) {
    let index = 0;

    for (const node of this._data) {
      if (node.key === key) {
        return index;
      }

      index += 1;
    }

    return -1;
  }

  internalNodes() {
    const nodes = [];

    this._data.forEach((node, index) => {
      if (this.isInternalNode(index)) {
        nodes.push(node);
      }
    });

    return nodes;
  }

  isEmpty() {
    return this._data.length === 0;
  }

  isFullNode(index) {
    return this.left(index) !== undefined && this.right(index) !== undefined;
  }

  isInternalNode(index) {
    return this.left(index) !== undefined || this.right(index) !== undefined;
  }

  isLeafNode(index) {
    return !this.left(index) && !this.right(index);
  }

  isPartialNode(index) {
    return this.degree(index) === 1;
  }

  keys() {
    const array = [];
    this._data.forEach(node => array.push(node.key));
    return array;
  }

  leafNodes() {
    const nodes = [];

    this._data.forEach((node, index) => {
      if (this.isLeafNode(index)) {
        nodes.push(node);
      }
    });

    return nodes;
  }

  left(index) {
    return this._data[this.leftIndex(index)];
  }

  leftIndex(index) {
    return (2 * index) + 1;
  }

  maxChildIndex(index) {
    const {left, right} = this.childrenIndices(index);

    if (left) {
      if (right && this._compare(right, left) > 0) {
        return right;
      }

      return left;
    }

    return -1;
  }

  minChildIndex(index) {
    const {left, right} = this.childrenIndices(index);

    if (left) {
      if (right && this._compare(left, right) > 0) {
        return right;
      }

      return left;
    }

    return -1;
  }

  node(index) {
    return this._data[index];
  }

  parent(index) {
    return this._data[this.parentIndex(index)];
  }

  parentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  partialNodes() {
    const nodes = [];

    this._data.forEach((node, index) => {
      if (this.isPartialNode(index)) {
        nodes.push(node);
      }
    });

    return nodes;
  }

  right(index) {
    return this._data[this.rightIndex(index)];
  }

  rightIndex(index) {
    return (2 * index) + 2;
  }

  search(key) {
    for (const node of this._data) {
      if (node.key === key) {
        return node;
      }
    }

    return undefined;
  }

  toArray() {
    const array = [];
    this._data.forEach(node => array.push(node));
    return array;
  }

  toPairs() {
    const array = [];
    this._data.forEach(node => array.push(node.toPair()));
    return array;
  }

  update(key, value) {
    const targetIndex = this.indexOf(key);

    if (targetIndex >= 0) {
      this._data[targetIndex].value = value;
    }

    return this;
  }

  values() {
    const array = [];
    this._data.forEach(node => array.push(node.value));
    return array;
  }
}

module.exports = Heap;
