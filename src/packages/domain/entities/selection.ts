import { ID } from './id';

export class Selection {
  constructor(
    private readonly _name: string,
    private readonly _price: number,
    private readonly _id?: ID,
  ) {
  }

  public get name(): string {
    return this._name;
  }

  public get price(): number {
    return this._price;
  }

  public get id(): ID | null {
    return this._id || null;
  }

  static of(...args: ConstructorParameters<typeof Selection>) {
    return new Selection(...args);
  }
}
