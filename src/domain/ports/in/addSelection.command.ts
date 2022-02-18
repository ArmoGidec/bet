import { Selection } from '../../entities';

export class AddSelectionCommand {
  constructor(private readonly _selection: Selection) {}

  public get selection(): Selection {
    return this._selection;
  }
}
