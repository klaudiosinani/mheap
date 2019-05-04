declare namespace node {
  export interface Constructor {
    new <T = any>(key: number, value: T): Instance<T>;
  }

  export interface Instance<T> {
    value: T;
    readonly key: number;
    toPair(): [number, T];
  }
}

declare namespace heap {
  type Degree = 0 | 1 | 2;

  interface Node<T> extends node.Instance<T> {}

  export interface Instance<T> {
    readonly root: Node<T> | undefined;
    readonly size: number;
    children(index: number): Node<T>[];
    clear(): this;
    degree(index: number): Degree;
    fullNodes(): Node<T>[];
    height(): number;
    includes(key: number): boolean;
    indexOf(key: number): number;
    internalNodes(): Node<T>[];
    isEmpty(): boolean;
    isFullNode(index: number): boolean;
    isInternalNode(index: number): boolean;
    isLeafNode(index: number): boolean;
    isPartialNode(index: number): boolean;
    keys(): number[];
    leafNodes(): Node<T>[];
    left(index: number): Node<T> | undefined;
    leftIndex(index: number): number;
    node(index: number): Node<T> | undefined;
    parent(index: number): Node<T> | undefined;
    parentIndex(index: number): number;
    partialNodes(): Node<T>[];
    right(index: number): Node<T> | undefined;
    rightIndex(index: number): number;
    search(key: number): Node<T> | undefined;
    toArray(): Node<T>[];
    toPairs(): [number, T][];
    update(key: number, value: T): this;
    values(): T[];
  }
}

declare namespace max {
  export interface Constructor {
    new <T = any>(): Instance<T>;
  }

  export interface Instance<T = any> extends heap.Instance<T> {}
}

declare namespace min {
  export interface Constructor {
    new <T = any>(): Instance<T>;
  }

  export interface Instance<T = any> extends heap.Instance<T> {}
}

declare namespace mheap {
  export interface Max<T = any> extends max.Instance<T> {}
  export interface Node<T = any> extends node.Instance<T> {}
}

declare const mheap: {
  Heap: heap.Constructor;
  Node: node.Constructor;
};

export = mheap;
