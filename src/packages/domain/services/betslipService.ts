import { Betslip } from '../entities/betslip';
import {
  AddSelectionCommand,
  AddSelectionUseCase,
  LoadBetslipPort,
  UpdateBetslipPort,
} from '../ports';
import { GetBetslipQuery } from '../ports/in/getBetslip.query';
import { RemoveSelectionCommand } from '@domain/ports/in/removeSelection.command';

export class BetslipService implements GetBetslipQuery, AddSelectionUseCase {
  constructor(
    private readonly _loadBetslipPort: LoadBetslipPort,
    private readonly _updateBetslipPort: UpdateBetslipPort,
  ) {}

  private _betslip: Betslip | null = null;

  async getBetslip(): Promise<Betslip> {
    if (!this._betslip) {
      this._betslip = await this._loadBetslipPort.loadBetslip();
    }
    return this._betslip;
  }

  async addSelection(
    addSelectionCommand: AddSelectionCommand,
  ): Promise<boolean> {
    const betslip = await this.getBetslip();

    const selectionsMarketRecord = Object.fromEntries(
      addSelectionCommand.market.selections.map((selection) => [
        selection.id,
        true,
      ]),
    );

    for (const selection of betslip.selections) {
      if (selection.id && selection.id in selectionsMarketRecord) {
        betslip.removeSelection(selection);
        break;
      }
    }

    betslip.addSelection(addSelectionCommand.selection);

    await this._updateBetslipPort.updateBetslip(betslip);
    return true;
  }

  async removeSelection(removeSelectionCommand: RemoveSelectionCommand) {
    const betslip = await this.getBetslip();

    betslip.removeSelection(removeSelectionCommand.selection);
    await this._updateBetslipPort.updateBetslip(betslip);

    return true;
  }
}
