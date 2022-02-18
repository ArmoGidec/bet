export interface StorageUseCase {
  get(key: string): any;
  set(key: string, value: any): ThisType<StorageUseCase>;
  has(key: string): boolean;
  delete(key: string): ThisType<StorageUseCase>;
}

export class Storage implements StorageUseCase {
  private readonly _local: Record<PropertyKey, any> = {};

  get(key: string) {
    if (Reflect.has(this._local, key)) {
      return this._local[key];
    }

    const value = localStorage.getItem(key);
    this._local[key] = value;
    return value;
  }
  set(key: string, value: any): ThisType<StorageUseCase> {
    localStorage.setItem(key, value);
    this._local[key] = value;
    return this;
  }
  has(key: string): boolean {
    return Reflect.has(this._local, key) || localStorage.getItem(key) !== devNull
  }
  delete(key: string): ThisType<StorageUseCase> {
    localStorage.removeItem(key);
    delete this._local[key];
    return this;
  }
}
