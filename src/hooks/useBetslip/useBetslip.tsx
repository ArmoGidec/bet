import {
  AddSelectionCommand,
  Betslip,
  BetslipService,
  Market,
  RemoveSelectionCommand,
  Selection,
} from '@domain';
import { useEvents } from '@hooks/useEvents';
import { BetslipMapper, RawBetslip } from '@mappers';
import { Storage } from '@services';
import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const storage = new Storage();

const BETSLIP_STORAGE_KEY = 'betslip';

const BetslipContext = createContext({
  betslip: new Betslip([]),
  addSelection: async (...args: any[]) => {},
  removeSelection: async (...args: any[]) => {},
});

export const BetslipProvider: FC = ({ children }) => {
  const { events } = useEvents();
  const selectionsRecord = useMemo(
    () =>
      Object.fromEntries(
        events
          .flatMap(({ markets }) =>
            markets.flatMap(({ selections }) => selections),
          )
          .map((selection) => [selection.id as PropertyKey, selection]),
      ),
    [events],
  );

  const betslipPort = {
    loadBetslip: async () => {
      if (!storage.has(BETSLIP_STORAGE_KEY)) {
        storage.set(BETSLIP_STORAGE_KEY, { selectionIds: [] });
      }
      const rawBetslip: RawBetslip = storage.get(BETSLIP_STORAGE_KEY);

      return BetslipMapper.fromRaw(rawBetslip, selectionsRecord);
    },
    updateBetslip: async (betslip: Betslip) => {
      storage.set(BETSLIP_STORAGE_KEY, BetslipMapper.toRaw(betslip));
      setBetslip(await betslipService.getBetslip());
    },
  };

  const betslipService = new BetslipService(betslipPort, betslipPort);

  useEffect(() => {
    betslipService.getBetslip().then(setBetslip);
  }, []);

  const removeSelection = async (selection: Selection) => {
    const removeSelectionCommand = new RemoveSelectionCommand(selection);
    await betslipService.removeSelection(removeSelectionCommand);
  };

  const addSelection = async (selection: Selection, market: Market) => {
    const addSelectionCommand = new AddSelectionCommand(selection, market);
    await betslipService.addSelection(addSelectionCommand);
  };

  const [betslip, setBetslip] = useState(useContext(BetslipContext).betslip);

  useEffect(() => {
    betslipService.getBetslip().then(setBetslip);
  }, [selectionsRecord]);

  return (
    <BetslipContext.Provider value={{ betslip, addSelection, removeSelection }}>
      {children}
    </BetslipContext.Provider>
  );
};

export function useBetslip() {
  return useContext(BetslipContext);
}
