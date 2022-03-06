import { Betslip } from '../../entities';

export interface GetBetslipQuery {
  getBetslip(): Promise<Betslip>;
}
