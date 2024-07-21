export class LRU<K, V> {
  private _limit: number;
  private _cache: Map<K, V>;

  constructor(maxSize: number) {
    this._limit = maxSize;
    this._cache = new Map();
  }

  get size() {
    return this._cache.size;
  }

  isEmpty() {
    return this._cache.size === 0;
  }

  isFull() {
    return this._cache.size >= this._limit;
  }

  set(key: K, value: V) {
    if (this.isFull()) {
      this._cache.delete(this._cache.keys().next().value);
    }

    this._cache.set(key, value);
  }

  get(key: K): V | undefined {
    return this._cache.get(key);
  }

  clear() {
    this._cache.clear();
  }

  resize(maxSize: number) {
    this._limit = maxSize;
    if (maxSize >= this._cache.size) return;

    for (let i = 0; i < this._cache.size - maxSize; i++) {
      this._cache.delete(this._cache.keys().next().value);
    }
  }
}
