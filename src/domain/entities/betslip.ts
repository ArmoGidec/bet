import { Selection } from './selection';

export class Betslip {
  constructor(private readonly _selections: Selection[]) {}

  public get selections(): Selection[] {
    return this._selections;
  }

  addSelection(selection: Selection) {
    this.selections.push(selection);
    return this;
  }

  static of(...args: ConstructorParameters<typeof Betslip>) {
    return new Betslip(...args);
  }
}
