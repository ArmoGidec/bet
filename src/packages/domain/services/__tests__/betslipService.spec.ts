import { BetslipService } from '../index';
import { instance, mock, when } from 'ts-mockito';
import {
  AddSelectionCommand,
  LoadBetslipPort,
  UpdateBetslipPort,
} from '../../ports';
import { Betslip, Market, Selection } from '../../entities';

describe('BetslipService', () => {
  it('should add selection success', async () => {
    const loadBetslipPort = mock<LoadBetslipPort>();
    const updateBetslipPort = mock<UpdateBetslipPort>();

    const mockedBetslip = mock(Betslip);

    when(mockedBetslip.selections).thenReturn([])

    when(loadBetslipPort.loadBetslip()).thenReturn(
      Promise.resolve(instance(mockedBetslip)),
    );

    when(updateBetslipPort.updateBetslip(mockedBetslip)).thenReturn(
      Promise.resolve(),
    );

    const betslipService = new BetslipService(
      instance(loadBetslipPort),
      instance(updateBetslipPort),
    );

    const mockedSelection = mock(Selection);
    const mockedMarked = mock(Market);

    when(mockedMarked.selections).thenReturn([]);

    const command = new AddSelectionCommand(
      instance(mockedSelection),
      instance(mockedMarked),
    );

    const result = await betslipService.addSelection(command);
    expect(result).toBeTruthy();
  });
});
