import { Betslip } from '../entities/betslip';
import {
  AddSelectionCommand,
  AddSelectionUseCase,
  LoadBetslipPort,
  UpdateBetslipPort,
} from '../ports';
import { GetBetslipQuery } from '../ports/in/getBetslip.query';
import { RemoveSelectionCommand } from '@domain/ports/in/removeSelection.command';
import { RemoveSelectionUseCase } from '@domain/ports/in/removeSelection.useCase';

export class BetslipService
  implements GetBetslipQuery, AddSelectionUseCase, RemoveSelectionUseCase
{
  constructor(
    private readonly _loadBetslipPort: LoadBetslipPort,
    private readonly _updateBetslipPort: UpdateBetslipPort,
  ) {}

  private _betslip: Betslip | null = null;

  getBetslip = async (): Promise<Betslip> => {
    if (!this._betslip) {
      this._betslip = await this._loadBetslipPort.loadBetslip();
    }
    return this._betslip;
  };

  addSelection = async (
    addSelectionCommand: AddSelectionCommand,
  ): Promise<boolean> => {
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
  };

  removeSelection = async (removeSelectionCommand: RemoveSelectionCommand) => {
    const betslip = await this.getBetslip();

    betslip.removeSelection(removeSelectionCommand.selection);
    await this._updateBetslipPort.updateBetslip(betslip);

    return true;
  };
}
