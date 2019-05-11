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
- [Usage](#usage)
- [API](#api)
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

A binary heap is a heap data structure that takes the form of a binary tree, defined with two additional constraints:

- **Shape property**: A binary heap is a complete binary tree, that is all levels, except possibly the last one / deepest are fully filled, and if the last level of the tree is not complete, the nodes of that level are filled from left to right.

- **Heap property**: The key stored in each node is either greater than or equal to or less than or equal to the keys in the node's children, according to the maximum & minimum total orders, respectively.

Heaps, where the parent key is greater than or equal to the child keys are called max-heaps, and those where it is less than or equal to are called min-heaps.

Mheap binary min & max heaps are internally implemented with an array, where nodes are stored by the level order traversal of the heap and the root node is always placed at index 0. This is due to the fact that any binary tree can be stored in an array, but because a binary heap is always a complete binary tree, it can be compactly & uniquely represented by storing its level order traversal in an array. As a result, no space is required for pointers, instead, the parent and children of each node are found by arithmetic calculations on array indices.

## Usage

Mheap exposes a chainable API, that can be utilized through a simple and minimal syntax, allowing you to combine methods effectively.

Usage examples can be also found at the [`test`](https://github.com/klaussinani/mheap/tree/master/test) directory.

```js
'use strict';
const {MaxHeap, MinHeap, Node} = require('mheap');

const maxHeap = new MaxHeap();
//=> MaxHeap { data: [] }

maxHeap.insert(15, 'A');
//=> MaxHeap { data: [Node { key: 15, value: 'A' }] }

maxHeap.root;
//=> Node { key: 15, value: 'A' }

const node = new Node(15, 'A');

maxHeap.root.toPair();
//=> [15, 'A']

maxHeap.root.key === node.key;
//=> true

maxHeap.root.value === node.value;
//=> true

maxHeap.insert(10, 'B').insert(5, 'C');
//=> MaxHeap { data: [
// Node { key: 15, value: 'A' },
// Node { key: 10, value: 'B' },
// Node { key: 5, value: 'C' } ] }

maxHeap.left(0);
//=> Node { key: 10, value: 'B' }

maxHeap.right(0);
//=> Node { key: 5, value: 'C' }

maxHeap.insert(7, 'D').insert(8, 'E').insert(2, 'F');
//=> MaxHeap { data: [
// Node { key: 15, value: 'A' },
// Node { key: 10, value: 'B' },
// Node { key: 5, value: 'C' },}
// Node { key: 7, value: 'D' },
// Node { key: 8, value: 'E' },
// Node { key: 2, value: 'F' } ] }

maxHeap.search(8);
//=> Node { key: 8, value: 'E',

maxHeap.includes(2);
//=> true

maxHeap.includes(100);
//=> false

maxHeap.height();
//=> 2

maxHeap.indexOf(7);
//=> 3

maxHeap.remove(1);
//=> MaxHeap { data: [
// Node { key: 15, value: 'A' },
// Node { key: 8, value: 'E' },
// Node { key: 5, value: 'C' },
// Node { key: 7, value: 'D' },
// Node { key: 2, value: 'F' } ] }

maxHeap.children(0);
//=> { left: Node { key: 8, value: 'E' },
// right: Node { key: 5, value: 'C' } }

maxHeap.extractMax();
//=> Node { key: 15, value: 'A' }

maxHeap.toPairs();
//=> [ [ 8, 'E' ], [ 7, 'D' ], [ 5, 'C' ], [ 2, 'F' ] ]
```

## API

The following documentation holds for both binary max & min heaps. The below described `heap` instance is used to depict the same methods that are available to both a min and a max heap, without overlooking their above described differences and unique qualities. For dedicated methods to min or max binary heaps, the `min` & `max` instances are used respectively.

#### heap.`root`

- Return Type: `Node | undefined`

Returns the root node of the heap.
If the heap is empty `undefined` is returned.

```js
heap.insert(10, 'A');
heap.root;
// => Node { key: 10, value: 'A' }
```

#### heap.`size`

- Return Type: `Number`

Returns the total number of nodes residing in the heap.

```js
heap.insert(15, 'A').insert(10, 'B').insert(5, 'C');
heap.size;
// => 3
```

#### heap.`childIndices(index)`

- Return Type: `{ left?: Number, right?: Number }`

Returns an object containing the child indices of the parent node corresponding to the given index. Both the given parent index and the returned child indices are relative to the unique level order array representation of the heap. If the parent node is either a full, a partial or leaf node then the returned object will respectively contain both, only one or none of the child indices.

##### **`index`**

- Type: `Number`

Node index relative to the unique level order array representation of the binary heap.

```js
heap.insert(15, 'A').insert(10, 'B').insert(5, 'C');
heap.childIndices(0);
// => { left: 1, right: 2 }
heap.childIndices(1);
// => { }
heap.childIndices(2);
// => { }
```

#### heap.`children(index)`

- Return Type: `{ left?: Node, right?: Node }`

Returns an object containing the children of the parent node corresponding to the given index. If the parent node is either a full, a partial or leaf node then the returned object will respectively contain both, only one or none of the child nodes.

##### **`index`**

- Type: `Number`

Node index relative to the unique level order array representation of the binary heap.

```js
heap.insert(15, 'A').insert(10, 'B').insert(5, 'C');
heap.children(0);
// => { left: Node { key:10, value 'B' }, right: Node { key: 5, value 'C' } }
heap.children(1);
// => { }
heap.children(2);
// => { }
```

#### heap.`clear()`

- Return Type: `Heap`

Mutates the heap by removing all residing nodes and returns it empty.

```js
heap.insert(15, 'A').insert(10, 'B').insert(5, 'C');
//=> Heap { data: [
// Node { key: 15, value: 'A' },
// Node { key: 10, value: 'B' },
// Node { key: 5, value: 'C' } ] }
heap.size;
//=> 3
heap.clear();
//=> Heap { data: [] } }
heap.size;
//=> 0
```

#### node.`degree(index)`

- Return Type: `Number`

Returns the number of sub-heaps that the node, corresponding to the give index, points to.

##### **`index`**

- Type: `Number`

Node index relative to the unique level order array representation of the binary heap.

```js
heap.insert(15, 'A').insert(10, 'B').insert(5, 'C');
heap.degree(0);
//=> 2
heap.degree(1);
//=> 0
```

#### heap.`extract(index)`

- Return Type: `Node | undefined`

Mutates the binary heap by removing the node, corresponding to the given index, and properly readjusts the heap in order for it to fulfill the two **shape** & **heap** **properties**. Returns the removed node, if the node is found, or `undefined` if it is not.

##### **`index`**

- Type: `Number`

Node index relative to the unique level order array representation of the binary heap.

```js
heap.insert(15, 'A').insert(10, 'B').insert(5, 'C').insert(8, 'D').insert(7, 'E').insert(1, 'F');
//=> Heap { data: [ 
// Node { key: 15, value: 'A' },
// Node { key: 10, value: 'B' },
// Node { key: 5, value: 'C' },
// Node { key: 8, value: 'D' },
// Node { key: 7, value: 'E' },
// Node { key: 1, value: 'F' } ] }
heap.extract(1);
//=> Node { key: 10, value: 'B' }
heap;
//=> Heap { data: [ 
// Node { key: 15, value: 'A' },
// Node { key: 8, value: 'D' },
// Node { key: 5, value: 'C' },
// Node { key: 1, value: 'F' },
// Node { key: 7, value: 'E' } ] }
```

#### maxHeap.`extractMax()`

- Return Type: `Node | undefined`

Mutates the binary max heap by removing the node with the greatest key, known as maximum node / root node, and properly readjusts the max heap in order for it to fulfill the two **shape** & **heap** **properties**. Returns the maximum node, if the heap is not empty, or `undefined` if it is.

```js
maxHeap.insert(15, 'A').insert(10, 'B').insert(5, 'C').insert(8, 'D').insert(7, 'E').insert(1, 'F');
//=> MaxHeap { data: [ 
// Node { key: 15, value: 'A' },
// Node { key: 10, value: 'B' },
// Node { key: 5, value: 'C' },
// Node { key: 8, value: 'D' },
// Node { key: 7, value: 'E' },
// Node { key: 1, value: 'F' } ] }
maxHeap.extractMax();
//=> Node { key: 15, value: 'A' }
heap;
//=> MaxHeap { data: [ 
// Node { key: 10, value: 'B' },
// Node { key: 8, value: 'D' },
// Node { key: 5, value: 'C' },
// Node { key: 1, value: 'F' },
// Node { key: 7, value: 'E' } ] }
```

#### minHeap.`extractMin()`

- Return Type: `Node | undefined`

Mutates the binary min heap by removing the node with the smallest key, known as minimum node / root node, and properly readjusts the min heap in order for it to fulfill the two **shape** & **heap** **properties**. Returns the minimum node, if the heap is not empty, or `undefined` if it is.

```js
minHeap.insert(15, 'A').insert(10, 'B').insert(5, 'C').insert(8, 'D').insert(7, 'E').insert(1, 'F');
//=> MinHeap { data: [ 
// Node { key: 1, value: 'F' },
// Node { key: 7, value: 'E' },
// Node { key: 5, value: 'C' },
// Node { key: 15, value: 'A' },
// Node { key: 8, value: 'D' },
// Node { key: 10, value: 'B' } ] }
minHeap.extractMin();
//=> Node { key: 1, value: 'F' }
heap;
//=> MinHeap { data: [ 
// Node { key: 5, value: 'C' },
// Node { key: 7, value: 'E' },
// Node { key: 10, value: 'B' },
// Node { key: 15, value: 'A' },
// Node { key: 8, value: 'D' } ] }
```

#### heap.`fullNodes()`

- Return Type: `Array<Node>`

Applies level order traversal to the heap and stores each traversed full node (node with two non-null children) in an array.
The array is returned at the end of the traversal.

```js
heap.insert(15, 'A').insert(10, 'B').insert(5, 'C');
heap.fullNodes();
//=> [ 
//  Node { key: 15, value: 'A' }
// ]
```

#### heap.`height()`

- Return Type: `Number`

Returns the maximum distance of any leaf node from the root. 
If the heap is empty `-1` is returned.

```js
heap.insert(15, 'A');
heap.height();
// => 0
heap.insert(10, 'B').insert(5, 'C').insert(8, 'D');
heap.height();
//=> 2
```

#### heap.`includes(key)`

- Return Type: `Boolean`

Determines whether the heap includes a node with a certain `key`, returning `true` or `false` as appropriate.

##### **`key`**

- Type: `Number`

Node `key` to search for.

```js
heap.insert(15, 'A').insert(10, 'B').insert(5, 'C');
heap.includes(10);
// => true
heap.includes(25);
// => false
heap.includes(5);
// => true
```

#### heap.`indexOf(key)`

- Return Type: `Number`

Returns the first index at which the node with the given `key` can be found in the unique level order array representation of the heap. If the node is not present then `-1` is returned.

##### **`key`**

- Type: `Number`

Node `key` to search for.

```js
heap.insert(15, 'A').insert(10, 'B').insert(5, 'C');
heap.indexOf(10);
// => 1
heap.indexOf(25);
// => -1
heap.indexOf(5);
// => 2
```

#### heap.`insert(key, value)`

- Return Type: `Heap`

Mutates the heap by inserting a new node at the appropriate location and return the heap itself.

##### **`key`**

- Type: `Number`

Can be any number that will correspond to the `key` of the created node. 

##### **`value`**

- Type: `Any`

Can be any value that will stored in the new node.

```js
heap.insert(15, 'A');
//=> Heap { data: [ Node { key: 15, value: 'A' } ] }
heap.insert(10, 'B').insert(5, 'C');
//=> Heap { data: [ 
// Node { key: 15, value: 'A' },
// Node { key: 10, value: 'B' },
// Node { key: 5, value: 'C' } ] }
```

#### heap.`internalNodes()`

- Return Type: `Array<Node>`

Applies level order traversal to the heap and stores each traversed internal node (non-leaf nodes) in an array.
The array is returned at the end of the traversal.

```js
heap.insert(15, 'A').insert(10, 'B').insert(5, 'C').insert(8, 'D');
heap.fullNodes();
//=> [ 
//  Node { key: 15, value: 'A' },
//  Node { key: 10, value: 'B' }
// ]
```

#### heap.`isEmpty()`

- Return Type: `Boolean`

Determines whether the heap is empty, returning `true` or `false` as appropriate.

```js
heap.insert(10, 'A');
heap.isEmpty();
//=> false
heap.clear().isEmpty();
//=> true
```

#### heap.`isFullNode(index)`

- Return Type: `Boolean`

Determines whether the node, corresponding to the given index, is a full node (has two non-null children), returning `true` or `false` as appropriate.

##### **`index`**

- Type: `Number`

Node index relative to the unique level order array representation of the binary heap.

```js
heap.insert(15, 'A');
heap.isFullNode(0)
//=> false
heap.insert(10, 'B').insert(5, 'C').isFullNode(0);
//=> true
```

#### heap.`isInternalNode(index)`

- Return Type: `Boolean`

Determines whether the node, corresponding to the given index, is an internal node (has at least one non-null child), returning `true` or `false` as appropriate.

##### **`index`**

- Type: `Number`

Node index relative to the unique level order array representation of the binary heap.

```js
heap.insert(10, 'A').isInternalNode(0);
//=> false
heap.insert(5, 'B').isInternalNode(0);
//=> true
```

#### heap.`isLeafNode(index)`

- Return Type: `Boolean`

Determines whether the node, corresponding to the given index, is a leaf node (has no children), returning `true` or `false` as appropriate.

##### **`index`**

- Type: `Number`

Node index relative to the unique level order array representation of the binary heap.

```js
heap.insert(15, 'A').isLeafNode(0);
//=> true
heap.insert(10, 'B').isLeafNode(0);
//=> false
```

#### heap.`isPartialNode(index)`

- Return Type: `Boolean`

Determines whether the node, corresponding to the given index, is a partial node (has ony one non-null child), returning `true` or `false` as appropriate.

##### **`index`**

- Type: `Number`

Node index relative to the unique level order array representation of the binary heap.

```js
heap.insert(15, 'A').isPartialNode(0);
//=> false
heap.insert(10, 'B').isPartialNode(0);
//=> true
heap.insert(5, 'C').isPartialNode(0);
//=> false
```

#### heap.`keys()`

- Return Type: `Array<Number>`

Applies level order traversal to the heap and stores the `key` of each traversed node in an array.
The array is returned at the end of the traversal.

```js
heap.insert(15, 'A').insert(10, 'B').insert(5, 'C').insert(8, 'D');
//=> [ 15, 10, 5, 8 ]
```

#### heap.`leafNodes()`

- Return Type: `Array<Node>`

Applies level order traversal to the heap and stores each traversed leaf node (node without children) in an array.
The array is returned at the end of the traversal.

```js
heap.insert(15, 'A').insert(10, 'B').insert(5, 'C').insert(8, 'D');
heap.leafNodes();
//=> [ 
//  Node { key: 5, value: 'C' },
//  Node { key: 8, value: 'D' }
// ]
```

#### heap.`left(index)`

- Return Type: `Node | undefined`

Returns the left child of the parent node corresponding to the given index. 
If the left child does not exist then `undefined` is returned.

##### **`index`**

- Type: `Number`

Parent node index relative to the unique level order array representation of the binary heap.

```js
heap.insert(15, 'A').insert(10, 'B').insert(5, 'C').insert(8, 'D');
heap.left(0);
//=> Node { key: 5, value: 'C' }
heap.left(1);
//=> Node { key: 8, value: 'D' }
heap.left(2);
//=> undefined
```

#### heap.`leftIndex(index)`

- Return Type: `Number`

Returns the index of left child, which is equal to `2 * index + 1`, of the parent node corresponding to the given index. Both the given parent index and the returned left child index are relative to the unique level order array representation of the heap.

##### **`index`**

- Type: `Number`

Parent node index relative to the unique level order array representation of the binary heap.

```js
heap.insert(15, 'A').insert(10, 'B').insert(5, 'C').insert(8, 'D');
heap.leftIndex(0);
//=> 1
heap.leftIndex(1);
//=> 3
heap.leftIndex(2);
//=> 5
```

#### heap.`levelOrder(fn)`

- Return Type: `Heap`

Applies level-order traversal (breadth-first traversal) to the heap and executes the provided `fn` function on each traversed node without mutating the heap. Returns the heap itself at the end of the traversal.

##### **`fn`**

- Type: `Function`

Unary function to execute on each node.

```js
heap.insert(15, 'A').insert(10, 'B').insert(5, 'C').insert(8, 'D');
heap.levelOrder(node => console.log(node.key));
//=> 15
//=> 10
//=> 5
//=> 8
```

#### heap.`maxChild(index)`

- Return Type: `Node | undefined`

Returns the child, with the greatest `key` value, of the parent node corresponding to the given index. If the parent node is either a partial or a leaf node then the method respectively returns the only child node or `undefined`.

##### **`index`**

- Type: `Number`

Parent node index relative to the unique level order array representation of the binary heap.

```js
heap.insert(15, 'A').insert(10, 'B').insert(5, 'C').insert(8, 'D');
heap.maxChild(0);
//=> Node { key: 10, value: 'B' }
heap.maxChild(1);
//=> Node { key: 8, value: 'D' }
heap.maxChild(2);
//=> undefined
```

#### heap.`maxChildIndex(index)`

- Return Type: `Number`

Returns the index of the child, with the greatest `key` value, of the parent node corresponding to the given index.  Both the given parent index and the returned max child index are relative to the unique level order array representation of the heap. If the parent node is either a partial or leaf node then the method respectively returns the index of the only child node or `-1`.

##### **`index`**

- Type: `Number`

Parent node index relative to the unique level order array representation of the binary heap.

```js
heap.insert(15, 'A').insert(10, 'B').insert(5, 'C').insert(8, 'D');
heap.maxChildIndex(0);
//=> 1
heap.maxChildIndex(1);
//=> 3
heap.maxChildIndex(2);
//=> -1
```

#### heap.`minChild(index)`

- Return Type: `Node | undefined`

Returns the child, with the smallest `key` value, of the parent node corresponding to the given index. If the parent node is either a partial or a leaf node then the method respectively returns the only child node or `undefined`.

##### **`index`**

- Type: `Number`

Parent node index relative to the unique level order array representation of the binary heap.

```js
heap.insert(15, 'A').insert(10, 'B').insert(5, 'C').insert(8, 'D');
heap.minChild(0);
//=> Node { key: 5, value: 'C' }
heap.minChild(1);
//=> Node { key: 8, value: 'D' }
heap.minChild(2);
//=> undefined
```

#### heap.`minChildIndex(index)`

- Return Type: `Number`

Returns the index of the child, with the smallest `key` value, of the parent node corresponding to the given index.  Both the given parent index and the returned min child index are relative to the unique level order array representation of the heap. If the parent node is either a partial or leaf node then the method respectively returns the index of the only child node or `-1`.

##### **`index`**

- Type: `Number`

Parent node index relative to the unique level order array representation of the binary heap.

```js
heap.insert(15, 'A').insert(10, 'B').insert(5, 'C').insert(8, 'D');
heap.maxChildIndex(0);
//=> 2
heap.maxChildIndex(1);
//=> 3
heap.maxChildIndex(2);
//=> -1
```

#### heap.`node(index)`

- Return Type: `Node | undefined`

Returns the the node corresponding to the give index. If the node does not exist then `undefined` is returned.

##### **`index`**

- Type: `Number`

Node index relative to the unique level order array representation of the binary heap.

```js
heap.insert(15, 'A').insert(10, 'B').insert(5, 'C').insert(8, 'D');
heap.node(0);
//=> Node { key: 15, value: 'A' }
heap.node(2);
//=> Node { key: 5, value: 'C' }
heap.node(15);
//=> undefined
```

#### heap.`parent(index)`

- Return Type: `Node | undefined`

Returns the parent node of the node corresponding to the given index. 
If the parent node does not exist then `undefined` is returned.

##### **`index`**

- Type: `Number`

Node index relative to the unique level order array representation of the binary heap.

```js
heap.insert(15, 'A').insert(10, 'B').insert(5, 'C').insert(8, 'D');
heap.parent(0);
//=> undefined
heap.parent(1);
//=> Node { key: 15, value: 'A' }
heap.parent(3);
//=> Node { key: 10, value: 'B' }
```

#### heap.`parentIndex(index)`

- Return Type: `Number`

Returns the index of the parent node, which is equal to `floor((index - 1) / 2)`, of the node corresponding to the given index. Both the given node index and the returned parent index are relative to the unique level order array representation of the heap.

##### **`index`**

- Type: `Number`

Node index relative to the unique level order array representation of the binary heap.

```js
heap.insert(15, 'A').insert(10, 'B').insert(5, 'C').insert(8, 'D');
heap.parentIndex(0);
//=> -1
heap.parentIndex(1);
//=> 0
heap.parentIndex(3);
//=> 1
```

#### heap.`partialNodes()`

- Return Type: `Array<Node>`

Applies level order traversal to the heap and stores each traversed partial node (node only one non-null child) in an array.
The array is returned at the end of the traversal.

```js
heap.insert(15, 'A').insert(10, 'B').insert(5, 'C').insert(8, 'D');
heap.partialNodes();
//=> [ 
//  Node { key: 10, value: 'B' }
// ]
```

#### heap.`remove(index)`

- Return Type: `Heap`

Mutates the binary heap by removing the node, corresponding to the given index, and properly readjusts the heap in order for it to fulfill the two **shape** & **heap** **properties**. Returns the heap itself.

##### **`index`**

- Type: `Number`

Node index relative to the unique level order array representation of the binary heap.

```js
heap.insert(15, 'A').insert(10, 'B').insert(5, 'C').insert(8, 'D').insert(7, 'E').insert(1, 'F');
//=> Heap { data: [ 
// Node { key: 15, value: 'A' },
// Node { key: 10, value: 'B' },
// Node { key: 5, value: 'C' },
// Node { key: 8, value: 'D' },
// Node { key: 7, value: 'E' },
// Node { key: 1, value: 'F' } ] }
heap.remove(0);
//=> Heap { data: [ 
// Node { key: 10,value: 'B' },
// Node { key: 8, value: 'D' },
// Node { key: 5, value: 'C' },
// Node { key: 1, value: 'F' },
// Node { key: 7, value: 'E' } ] }
```

#### heap.`right(index)`

- Return Type: `Node | undefined`

Returns the right child node of the parent node corresponding to the given index. 
If the right child node does not exist then `undefined` is returned.

##### **`index`**

- Type: `Number`

Parent node index relative to the unique level order array representation of the binary heap.

```js
heap.insert(15, 'A').insert(10, 'B').insert(5, 'C').insert(8, 'D');
heap.right(0);
//=> Node { key: 5, value: 'C' }
heap.right(1);
//=> undefined
```

#### heap.`rightIndex(index)`

- Return Type: `rightIndex`

Returns the index of the right child node, which is equal to `2 * index + 2;`, of the parent node corresponding to the given index. Both the given parent node index and the returned right child index are relative to the unique level order array representation of the heap.

##### **`index`**

- Type: `Number`

Parent node index relative to the unique level order array representation of the binary heap.

```js
heap.insert(15, 'A').insert(10, 'B').insert(5, 'C').insert(8, 'D');
heap.rightIndex(0);
//=> 2
heap.rightIndex(1);
//=> 4
heap.rightIndex(2);
//=> 6
```

#### heap.`search(key)`

- Return Type: `Node | undefined`

Determines whether the heap includes a node with a certain `key`, returning the targeted node or `undefined` as appropriate.

##### **`key`**

- Type: `Number`

Node `key` to search for.

```js
heap.insert(15, 'A').insert(10, 'B').insert(5, 'C').insert(8, 'D');
heap.search(10);
// => Node { key: 10, value: 'B' }
heap.search(5);
// => Node { key: 5, value: 'C' }
heap.search(25);
// => undefined
```

#### heap.`toArray()`

- Return Type: `Array<Node>`

Applies level order traversal to the heap and stores each traversed node in an array.
The array is returned at the end of the traversal.

```js
heap.insert(15, 'A').insert(10, 'B').insert(5, 'C').insert(8, 'D');
heap.toArray();
//=> [ 
//  Node { key: 15, value: 'A' },
//  Node { key: 10, value: 'B' },
//  Node { key: 5, value: 'C' },
//  Node { key: 8, value: 'D' }
// ]
```

#### heap.`toPairs()`

- Return Type: `Array<[Number, Any]>`

Applies level order traversal to the heap and for each traversed node stores in an array an ordered-pair/2-tuple, where the first element is a `number` corresponding to the `key` of the traversed node, and the last one is a value of type `any`, corresponding to the `value` stored in the traversed node.
The array is returned at the end of the traversal.

```js
heap.insert(15, 'A').insert(10, 'B').insert(5, 'C').insert(8, 'D');
heap.toPairs();
//=> [ [ 15, 'A' ], [ 10, 'B' ], [ 5, 'C' ], [ 8, 'D' ] ]
```

#### heap.`update(key, value)`

- Return Type: `Heap`

Mutates the heap by inserting a new `value` at the new node corresponding to the given `key`.
Returns the heap itself.

##### **`key`**

- Type: `Number`

The number corresponding to the `key` of the existing node. 

##### **`value`**

- Type: `Any`

The new `value` that will be stored in the existing node.

```js
heap.insert(15, 'A').insert(10, 'B')
//=> Heap { data: [ 
// Node { key: 15, value: 'A' },
// Node { key: 10, value: 'A' } ] }
heap.update(10, 'a').insert(10, 'b');
//=> Heap { data: [ 
// Node { key: 15, value: 'a' },
// Node { key: 10, value: 'b' } ] }
```

#### heap.`values()`

- Return Type: `Array<Any>`

Applies level order traversal to the heap and stores the `value` of each traversed node in an array.
The array is returned at the end of the traversal.

```js
heap.insert(15, 'A').insert(10, 'B').insert(5, 'C').insert(8, 'D');
//=> [ 'A', 'B', 'C', 'D' ]
```

Also available, along with the `MaxHeap` & `MinHeap` exposed classes, is the `Node` class, mainly useful for testing purposes, since it can be utilized to compare heap nodes. The class has a binary constructor method, with a `key` and a `value` parameter, corresponding to the key and the value stored in the created instance, respectively.

#### node.`key`

- Return Type: `Number`

The `key` corresponding to the node instance.

```js
const {Node} = require('mheap');

const node = new Node(10, 'A');
// => Node { key:10, value: 'A' }
node.key;
//=> 10
```

#### node.`value`

- Return Type: `Any`

The value that the node contains.

```js
const {Node} = require('mheap');

const node = new Node(10, 'A');
// => Node { key: 10, value: 'A' }
node.value;
//=> 'A'
node.value = 'B'
// => Node { key: 10, value: 'B' }
```

#### node.`toPair()`

- Return Type: `[Number, Any]`

Returns an ordered-pair/2-tuple, where the first element is a number corresponding to the `key` of the node, and the last one is a value, that can be of any type, corresponding to the `value` stored in the node.

```js
const {Node} = require('mheap');


const node = new Node(5, 'B');

node.toPair();
//=> [ 5, 'B' ]
```

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
