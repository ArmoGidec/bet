import { Betslip } from "src/packages/domain/entities/betslip";

export interface LoadBetslipPort {
  loadBetslip(): Promise<Betslip>;
}
