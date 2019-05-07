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
    children(index: number): { left?: Node<T>; right?: Node<T> };
    childrenIndices(index: number): { left?: number; right?: number };
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
    maxChild(index: number): Node<T> | undefined;
    maxChildIndex(index: number): number;
    minChild(index: number): Node<T> | undefined;
    minChildIndex(index: number): number;
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
  interface Node<T> extends node.Instance<T> {}

  export interface Constructor {
    new <T = any>(): Instance<T>;
  }

  export interface Instance<T = any> extends heap.Instance<T> {
    extract(index): Node<T> | undefined;
    extractMax(): Node<T> | undefined;
    insert(key: number, value: T): this;
    remove(index: number): this;
  }
}

declare namespace min {
  interface Node<T> extends node.Instance<T> {}

  export interface Constructor {
    new <T = any>(): Instance<T>;
  }

  export interface Instance<T = any> extends heap.Instance<T> {
    insert(key: number, value: T): this;
    remove(index: number): this;
  }
}

declare namespace mheap {
  export interface Max<T = any> extends max.Instance<T> {}
  export interface Min<T = any> extends min.Instance<T> {}
  export interface Node<T = any> extends node.Instance<T> {}
}

declare const mheap: {
  Max: max.Constructor;
  Min: min.Constructor;
  Node: node.Constructor;
};

export = mheap;
