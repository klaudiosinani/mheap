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
  interface Node<T> extends node.Instance<T> {}

  export interface Constructor {
    new <T = any>(): Instance<T>;
  }

  export interface Instance<T> {
    readonly root: Node<T> | undefined;
    readonly size: number;
    clear(): this;
    includes(key: number): boolean;
    isEmpty(): boolean;
    keys(): number[];
    search(key: number): Node<T> | undefined;
    toArray(): Node<T>[];
    toPairs(): [number, T][];
    values(): T[];
  }
}

declare namespace mheap {
  export interface Heap<T = any> extends heap.Instance<T> {}
  export interface Node<T = any> extends node.Instance<T> {}
}

declare const mheap: {
  Heap: heap.Constructor;
  Node: node.Constructor;
};

export = mheap;
