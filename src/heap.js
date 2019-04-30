'use strict';

class Heap {
  constructor() {
    this._data = [];
  }

  get size() {
    return this._data.length;
  }
}

module.exports = Heap;
