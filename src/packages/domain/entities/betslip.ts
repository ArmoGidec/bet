import { Selection } from './selection';

export class Betslip {
  constructor(private readonly _selections: Selection[]) {}

  public get selections(): Selection[] {
    return this._selections;
  }

  clone() {
    return new Betslip(this._selections);
  }

  addSelection(selection: Selection) {
    this.selections.push(selection);
    return this;
  }

  removeSelection(selection: Selection) {
    const idx = this.selections.findIndex(({ id }) => selection.id === id);
    if (idx !== -1) {
      this.selections.splice(idx, 1);
    }

    return this;
  }

  static of(...args: ConstructorParameters<typeof Betslip>) {
    return new Betslip(...args);
  }
}
