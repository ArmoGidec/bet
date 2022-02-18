import { ID } from './id';
import { Market } from './market';

export class Event {
  constructor(
    private readonly _name: string,
    private readonly _markets: Market[],
    private readonly _id?: ID,
  ) {}

  public get id(): ID | null {
    return this._id || null;
  }

  public get markets(): Market[] {
    return this._markets;
  }

  public get name(): string {
    return this._name;
  }

  static of(...args: ConstructorParameters<typeof Event>): Event {
    return new Event(...args);
  }
}
