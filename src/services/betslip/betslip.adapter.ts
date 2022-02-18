import { Betslip, LoadBetslipPort, UpdateBetslipPort } from '@domain';
import { BetslipMapper } from '@mappers';
import { Storage } from '../storage';

const storage = new Storage();

const BETSLIP_STORAGE_KEY = 'betslip';

export class BetslipAdapter implements LoadBetslipPort, UpdateBetslipPort {
  async loadBetslip(): Promise<Betslip> {
    const rawBetslip = storage.get(BETSLIP_STORAGE_KEY);
    return BetslipMapper.fromRaw(rawBetslip);
  }

  async updateBetslip(betslip: Betslip): Promise<void> {
    storage.set(BETSLIP_STORAGE_KEY, BetslipMapper.toRaw(betslip));
  }
}
