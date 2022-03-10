import {
  AddSelectionCommand,
  Betslip,
  Market,
  RemoveSelectionCommand,
  Selection,
} from '@domain';
import { Button, Typography } from '@mui/material';
import { useBetslip } from '@hooks/useBetslip';
import { useEffect, useState } from 'react';

interface SelectionItemProps {
  selection: Selection;
  market: Market;
}

export function SelectionItem({ selection, market }: SelectionItemProps) {
  const betsklipService = useBetslip();
  const [betslip, setBetslip] = useState<Betslip>(new Betslip([]));

  useEffect(() => {
    betsklipService.getBetslip().then(setBetslip);
  }, [betsklipService]);

  const isInBetslip =
    betslip.selections.findIndex(({ id }) => id === selection.id) !== -1;

  const toggleSelection = () => {
    if (isInBetslip) {
      const removeSelectionCommand = new RemoveSelectionCommand(selection);
      betsklipService.removeSelection(removeSelectionCommand);
      return;
    }

    const addSelectionCommand = new AddSelectionCommand(selection, market);
    betsklipService.addSelection(addSelectionCommand);
  };

  return (
    <Button
      variant={isInBetslip ? 'contained' : 'outlined'}
      sx={{ flexDirection: 'column' }}
      onClick={toggleSelection}
    >
      <Typography>{selection.name}</Typography>
      <Typography>{selection.price}</Typography>
    </Button>
  );
}
