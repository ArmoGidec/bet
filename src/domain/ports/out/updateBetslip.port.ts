import { Betslip } from "src/domain/entities/betslip";

export interface UpdateBetslipPort {
  updateBetslip(betslip: Betslip): Promise<void>;
}
