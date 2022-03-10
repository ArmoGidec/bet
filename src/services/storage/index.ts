interface Listener {
  (storage: Storage): void;
}

export interface StorageUseCase {
  get(key: string): any;

  set(key: string, value: any): ThisType<StorageUseCase>;

  has(key: string): boolean;

  delete(key: string): ThisType<StorageUseCase>;

  subscribe(key: string, listener: Listener): () => void;
}
export class Storage implements StorageUseCase {
  private readonly _local: Record<PropertyKey, any> = {};
  private readonly _listenersMap: Record<string, Set<Listener>> =
    Object.create(null);

  get(key: string) {
    if (Reflect.has(this._local, key)) {
      return this._local[key];
    }

    let value = localStorage.getItem(key);

    if (value) {
      value = JSON.parse(value);
    }

    this._local[key] = value;
    return value;
  }

  set(key: string, value: any): ThisType<StorageUseCase> {
    localStorage.setItem(key, JSON.stringify(value));
    this._local[key] = value;
    this.trigger(key);
    return this;
  }

  has(key: string): boolean {
    return Reflect.has(this._local, key) || localStorage.getItem(key) !== null;
  }

  delete(key: string): ThisType<StorageUseCase> {
    localStorage.removeItem(key);
    delete this._local[key];
    this.trigger(key);
    return this;
  }

  subscribe(key: string, listener: Listener): () => void {
    let listeners = this._listenersMap[key];

    if (!listeners) {
      listeners = new Set<Listener>();
      this._listenersMap[key] = listeners;
    }

    listeners.add(listener);

    return () => {
      this._listenersMap[key]?.delete(listener);
    };
  }

  private trigger(key: string) {
    const listeners = this._listenersMap[key];

    if (!listeners) {
      return;
    }

    listeners.forEach((listener) => {
      listener(this);
    });
  }
}
