import { Betslip, LoadBetslipPort, UpdateBetslipPort } from '@domain';
import { BetslipMapper, RawBetslip } from '@mappers';
import { Storage } from '@services';

const storage = new Storage();

const BETSLIP_STORAGE_KEY = 'betslip';

export class BetslipAdapter implements LoadBetslipPort, UpdateBetslipPort {
  async loadBetslip(): Promise<Betslip> {
    if (!storage.has(BETSLIP_STORAGE_KEY)) {
      storage.set(BETSLIP_STORAGE_KEY, { selections: [] });
    }
    const rawBetslip: RawBetslip = storage.get(BETSLIP_STORAGE_KEY);

    return BetslipMapper.fromRaw(rawBetslip);
  }

  async updateBetslip(betslip: Betslip): Promise<void> {
    storage.set(BETSLIP_STORAGE_KEY, BetslipMapper.toRaw(betslip));
  }
}
