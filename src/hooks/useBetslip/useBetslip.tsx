import { Betslip, BetslipService } from '@domain';
import { BetslipMapper, RawBetslip } from '@mappers';
import { Storage } from '@services';
import { createContext, FC, useContext, useState } from 'react';

const storage = new Storage();

const BETSLIP_STORAGE_KEY = 'betslip';

const betslipPort = {
  loadBetslip: async () => new Betslip([]),
  updateBetslip: async (...args: any) => {},
};

const betslipService = new BetslipService(betslipPort, betslipPort);

const BetslipContext = createContext<BetslipService>(betslipService);

export const BetslipProvider: FC = ({ children }) => {
  const betslipPort = {
    loadBetslip: async () => {
      if (!storage.has(BETSLIP_STORAGE_KEY)) {
        storage.set(BETSLIP_STORAGE_KEY, { selections: [] });
      }
      const rawBetslip: RawBetslip = storage.get(BETSLIP_STORAGE_KEY);

      return BetslipMapper.fromRaw(rawBetslip);
    },
    updateBetslip: async (betslip: Betslip) => {
      storage.set(BETSLIP_STORAGE_KEY, BetslipMapper.toRaw(betslip));
      setBetslipService(new BetslipService(betslipPort, betslipPort));
    },
  };

  const [betslipService, setBetslipService] = useState(
    new BetslipService(betslipPort, betslipPort),
  );

  return (
    <BetslipContext.Provider value={betslipService}>
      {children}
    </BetslipContext.Provider>
  );
};

export function useBetslip(): BetslipService {
  return useContext(BetslipContext) as unknown as BetslipService;
}
