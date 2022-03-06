import { AddSelectionCommand, Betslip, BetslipService } from '@domain';
import { BetslipAdapter } from './betslip.adapter';
import { createContext, FC, useContext, useEffect, useState } from 'react';
import { RemoveSelectionCommand } from '@domain/ports/in/removeSelection.command';

const betslipAdapter = new BetslipAdapter();

const betslipService = new BetslipService(betslipAdapter, betslipAdapter);

const getBetslip = () => betslipService.getBetslip();
const addSelection = (
  ...args: ConstructorParameters<typeof AddSelectionCommand>
) => {
  const addSelectionCommand = new AddSelectionCommand(...args);
  return betslipService.addSelection(addSelectionCommand);
};

const removeSelection = (
  ...args: ConstructorParameters<typeof RemoveSelectionCommand>
) => {
  const removeSelectionCommand = new RemoveSelectionCommand(...args);
  return betslipService.removeSelection(removeSelectionCommand);
};

const BetslipContext = createContext({
  betslip: new Betslip([]),
  addSelection,
  removeSelection,
});

export function useBetslipProvider() {
  const [betslip, setBetslip] = useState(new Betslip([]));

  const fetchBetslip = () => {
    getBetslip().then((bs) => setBetslip(bs.clone()));
  };

  const contextValue = {
    betslip,
    addSelection: async (...args: Parameters<typeof addSelection>) => {
      const result = await addSelection(...args);
      fetchBetslip();
      return result;
    },
    removeSelection: async (...args: Parameters<typeof removeSelection>) => {
      const result = await removeSelection(...args);
      fetchBetslip();
      return result;
    },
  };

  useEffect(() => {
    fetchBetslip();
  }, []);

  const BetslipProvider: FC = ({ children }) => (
    <BetslipContext.Provider value={contextValue}>
      {children}
    </BetslipContext.Provider>
  );

  return { BetslipProvider };
}

export function useBetslip() {
  return useContext(BetslipContext);
}
