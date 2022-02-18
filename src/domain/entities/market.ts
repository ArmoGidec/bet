import { ID } from './id';
import { Selection } from './selection';

export class Market {
  constructor(
    private readonly _name: string,
    private readonly _markets: Selection[],
    private readonly _id?: ID,
  ) {}

  public get id(): ID | null {
    return this._id || null;
  }

  public get markets(): Selection[] {
    return this._markets;
  }

  public get name(): string {
    return this._name;
  }

  static of(...args: ConstructorParameters<typeof Market>): Market {
    return new Market(...args);
  }
}
