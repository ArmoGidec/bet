import { Market, Selection } from '../../entities';

export class AddSelectionCommand {
  constructor(
    private readonly _selection: Selection,
    private readonly _market: Market,
  ) {
  }

  public get selection(): Selection {
    return this._selection;
  }

  get market(): Market {
    return this._market;
  }
}
