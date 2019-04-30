'use strict';

class Heap {
  constructor() {
    this._data = [];
  }

  get size() {
    return this._data.length;
  }

  isEmpty() {
    return this._data.length === 0;
  }
}

module.exports = Heap;
