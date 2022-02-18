import { BetslipService } from '@domain';
import { BetslipAdapter } from './betslip.adapter';

const betslipAdapter = new BetslipAdapter();

export const betslipService = new BetslipService(
  betslipAdapter,
  betslipAdapter,
);
