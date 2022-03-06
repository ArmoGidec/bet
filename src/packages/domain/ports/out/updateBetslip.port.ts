import { Betslip } from "src/packages/domain/entities/betslip";

export interface UpdateBetslipPort {
  updateBetslip(betslip: Betslip): Promise<void>;
}
