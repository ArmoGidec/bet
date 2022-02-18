import { Betslip } from '../entities/betslip';
import {
  AddSelectionCommand,
  AddSelectionUseCase,
  LoadBetslipPort,
  UpdateBetslipPort,
} from '../ports';
import { GetBetslipQuery } from '../ports/in/getBetslip.query';

export class BetslipService implements GetBetslipQuery, AddSelectionUseCase {
  constructor(
    private readonly _loadBetslipPort: LoadBetslipPort,
    private readonly _updateBetslipPort: UpdateBetslipPort,
  ) {}

  getBetslip(): Promise<Betslip> {
    return this._loadBetslipPort.loadBetslip();
  }

  async addSelection(
    addSelectionCommand: AddSelectionCommand,
  ): Promise<boolean> {
    const betslip = await this.getBetslip();
    betslip.addSelection(addSelectionCommand.selection);

    await this._updateBetslipPort.updateBetslip(betslip);
    return true;
  }
}
