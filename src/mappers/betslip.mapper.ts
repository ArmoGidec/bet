import { Betslip } from '@domain';
import { type RawBetslip, SelectionMapper } from '.';

export class BetslipMapper {
  static fromRaw(rawBetslip: RawBetslip): Betslip {
    return Betslip.of(
      rawBetslip.selections.map((rawSelection) =>
        SelectionMapper.fromRaw(rawSelection),
      ),
    );
  }

  static toRaw(betslip: Betslip): RawBetslip {
    return {
      selections: betslip.selections.map((selection) =>
        SelectionMapper.toRaw(selection),
      ),
    };
  }
}
