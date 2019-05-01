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

  clear() {
    this._data = [];
    return this;
  }

  includes(key) {
    for (const node of this._data) {
      if (node.key === key) {
        return true;
      }
    }

    return false;
  }

  isEmpty() {
    return this._data.length === 0;
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
}

module.exports = Heap;
