import { Betslip, Selection } from '@domain';
import { type RawBetslip, SelectionMapper } from '.';

export class BetslipMapper {
  static fromRaw(rawBetslip: RawBetslip, selectionsRecord: Record<PropertyKey, Selection>): Betslip {
    return Betslip.of(
      rawBetslip.selectionIds.map((selectionId) => selectionsRecord[selectionId!]),
    );
  }

  static toRaw(betslip: Betslip): RawBetslip {
    return {
      selectionIds: betslip.selections.map(
        (selection) => SelectionMapper.toRaw(selection).id,
      ),
    };
  }
}
