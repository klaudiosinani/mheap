'use strict';

class Node {
  constructor(key, value) {
    this._key = key;
    this._value = value;
  }

  get key() {
    return this._key;
  }
}

module.exports = Node;
