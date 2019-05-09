import {MaxHeap, Node} from '../../types/mheap';

const heap = new MaxHeap<string>();
//=> MaxHeap { data: [] }

heap.insert(15, 'A');
//=> MaxHeap { data: [Node { key: 15, value: 'A' }] }

heap.root;
//=> Node { key: 15, value: 'A' }

const node = new Node<string>(15, 'A');

heap.root.toPair();
//=> [15, 'A']

heap.root.key === node.key;
//=> true

heap.root.value === node.value;
//=> true

heap.insert(10, 'B').insert(5, 'C');
//=> MaxHeap { data: [
// Node { key: 15, value: 'A' },
// Node { key: 10, value: 'B' },
// Node { key: 5, value: 'C' } ] }

heap.left(0);
//=> Node { key: 10, value: 'B' }

heap.right(0);
//=> Node { key: 5, value: 'C' }

heap.insert(7, 'D').insert(8, 'E').insert(2, 'F');
//=> MaxHeap { data: [
// Node { key: 15, value: 'A' },
// Node { key: 10, value: 'B' },
// Node { key: 5, value: 'C' },}
// Node { key: 7, value: 'D' },
// Node { key: 8, value: 'E' },
// Node { key: 2, value: 'F' } ] }

heap.search(8);
//=> Node { key: 8, value: 'E',

heap.includes(2);
//=> true

heap.includes(100);
//=> false

heap.height();
//=> 2

heap.indexOf(7);
//=> 3

heap.remove(1);
//=> MaxHeap { data: [
// Node { _key: 15, _value: 'A' },
// Node { _key: 8, _value: 'E' },
// Node { _key: 5, _value: 'C' },
// Node { _key: 7, _value: 'D' },
// Node { _key: 2, _value: 'F' } ] }

heap.children(0);
//=> { left: Node { key: 8, value: 'E' },
// right: Node { key: 5, value: 'C' } }

heap.extractMax();
//=> Node { key: 15, value: 'A' }

heap.toPairs();
//=> [ [ 8, 'E' ], [ 7, 'D' ], [ 5, 'C' ], [ 2, 'F' ] ]
