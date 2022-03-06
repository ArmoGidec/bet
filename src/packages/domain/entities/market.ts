import { ID } from './id';
import { Selection } from './selection';
import { Event } from './event';

export class Market {
  constructor(
    private readonly _name: string,
    private readonly _selections: Selection[],
    private readonly _id?: ID,
  ) {
  }

  public get id(): ID | null {
    return this._id || null;
  }

  public get selections(): Selection[] {
    return this._selections;
  }

  public get name(): string {
    return this._name;
  }

  static of(...args: ConstructorParameters<typeof Market>): Market {
    return new Market(...args);
  }
}
