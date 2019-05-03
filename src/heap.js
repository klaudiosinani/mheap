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

  children(index) {
    const children = [];

    const left = this.left(index);
    const right = this.right(index);

    if (left) {
      children.push(left);
    }

    if (right) {
      children.push(right);
    }

    return children;
  }

  clear() {
    this._data = [];
    return this;
  }

  degree(index) {
    return this.children(index).length;
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

  left(index) {
    return this._data[this.leftIndex(index)];
  }

  leftIndex(index) {
    return (2 * index) + 1;
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

  values() {
    const array = [];
    this._data.forEach(node => array.push(node.value));
    return array;
  }
}

module.exports = Heap;
