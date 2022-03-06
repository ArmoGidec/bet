import { Selection } from '@domain';

export class RemoveSelectionCommand {
  constructor(
    private readonly _selection: Selection,
  ) {
  }

  public get selection(): Selection {
    return this._selection;
  }
}
