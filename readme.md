<h1 align="center">
  Mheap
</h1>

<h4 align="center">
  🌳 Binary min & max heaps for ES6
</h4>

<p align="center">
  <a href="https://travis-ci.com/klaussinani/mheap">
    <img alt="Build Status" src="https://travis-ci.com/klaussinani/mheap.svg?branch=master">
  </a>
  <a href='https://coveralls.io/github/klaussinani/mheap?branch=master'>
    <img alt="Coverage Status" src="https://coveralls.io/repos/github/klaussinani/mheap/badge.svg?branch=master">
  </a>
</p>

## Description

ES6 implementation of the binary min & max heap data structures with TypeScript support.

Come over to [Twitter](https://twitter.com/klaussinani) to share your thoughts on the project.

Visit the [contributing guidelines](https://github.com/klaussinani/mheap/blob/master/contributing.md#translating-documentation) to learn more on how to translate this document into more languages.

## Contents

- [Description](#description)
- [Install](#install)
- [In Depth](#in-depth)
- [Development](#development)
- [Related](#related)
- [Team](#team)
- [License](#license)

## Install

### Yarn

```bash
yarn add mheap
```

### NPM

```bash
npm install mheap
```

## In Depth

A binary heap is a heap data structure that takes the form of a binary tree, with two additional constraints:

- **Shape property**: A binary heap is a complete binary tree, that is all levels of the tree, except possibly the last one / deepest are fully filled, and, if the last level of the tree is not complete, the nodes of that level are filled from left to right.

- **Heap property**: The key stored in each node is either greater than or equal to or less than or equal to the keys in the node's children, according to the maximum & minimum total orders, respectively.

Heaps, where the parent key is greater than or equal to the child keys are called max-heaps, and those where it is less than or equal to are called min-heaps.

Mheap binary min & max heaps are internally implemented with an array, where nodes are stored by the level order traversal of the heap and the root node is always placed at index 0. This is due to the fact that any binary tree can be stored in an array, but because a binary heap is always a complete binary tree, it can be compactly & uniquely represented by storing its level order traversal in an array. As a result, no space is required for pointers, instead, the parent and children of each node are found by arithmetic calculations on array indices.

## Development

For more info on how to contribute to the project, please read the [contributing guidelines](https://github.com/klaussinani/mheap/blob/master/contributing.md).

- Fork the repository and clone it to your machine
- Navigate to your local fork: `cd mheap`
- Install the project dependencies: `npm install` or `yarn install`
- Lint the code and run the tests: `npm test` or `yarn test`

## Related

- [binstree](https://github.com/klaussinani/binstree) - Binary search trees for ES6
- [doublie](https://github.com/klaussinani/doublie) - Doubly circular & linear linked lists for ES6
- [singlie](https://github.com/klaussinani/singlie) - Singly circular & linear linked lists for ES6

## Team

- Klaus Sinani [(@klaussinani)](https://github.com/klaussinani)

## License

[MIT](https://github.com/klaussinani/mheap/blob/master/license.md)
