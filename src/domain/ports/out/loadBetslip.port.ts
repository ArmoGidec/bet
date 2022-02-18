import { Betslip } from "src/domain/entities/betslip";

export interface LoadBetslipPort {
  loadBetslip(): Promise<Betslip>;
}
