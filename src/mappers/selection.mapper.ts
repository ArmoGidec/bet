import { Selection } from '@domain';
import { RawSelection } from './types';

export class SelectionMapper {
  static fromRaw(rawSelection: RawSelection): Selection {
    return Selection.of(rawSelection.name, rawSelection.price, rawSelection.id);
  }

  static toRaw(selection: Selection): RawSelection {
    return {
      name: selection.name,
      price: selection.price,
      ...selection.id && {
        id: selection.id,
      }
    };
  }
}
