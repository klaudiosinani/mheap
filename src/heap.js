'use strict';

class Heap {
  constructor() {
    this._data = [];
  }

  get size() {
    return this._data.length;
  }

  clear() {
    this._data = [];
    return this;
  }

  isEmpty() {
    return this._data.length === 0;
  }
}

module.exports = Heap;
