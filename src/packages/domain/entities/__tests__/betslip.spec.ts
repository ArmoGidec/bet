import { Betslip, Selection } from "../index";

describe('Betslip', () => {
  it('should add selection', () => {
    const betslip = Betslip.of([]);
    let prevLength = betslip.selections.length;

    const selection = Selection.of('name', 1, 1);
    betslip.addSelection(selection);

    expect(betslip.selections.length).toBe(prevLength + 1);
    expect(betslip.selections).toContain(selection);
  });
});
