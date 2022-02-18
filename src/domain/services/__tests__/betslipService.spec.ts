import { BetslipService } from '..';
import { instance, mock, when } from 'ts-mockito';
import {
  AddSelectionCommand,
  LoadBetslipPort,
  UpdateBetslipPort,
} from '../../ports';
import { Betslip, Selection } from '../../entities';

describe('BetslipService', () => {
  it('should add selection success', () => {
    const loadBetslipPort = mock<LoadBetslipPort>();
    const updateBetslipPort = mock<UpdateBetslipPort>();

    const mockedBetslip = mock(Betslip);

    when(loadBetslipPort.loadBetslip()).thenReturn(
      Promise.resolve(instance(mockedBetslip)),
    );

    const betslipService = new BetslipService(
      instance(loadBetslipPort),
      instance(updateBetslipPort),
    );

    const mockedSelection = mock(Selection);
    const command = new AddSelectionCommand(instance(mockedSelection));

    const result = betslipService.addSelection(command);
    expect(result).toBeTruthy();
  });
});
