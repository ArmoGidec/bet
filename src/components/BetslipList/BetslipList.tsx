import { Market, Selection } from '@domain';
import { useBetslip, useEvents } from '@hooks';
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { useMemo } from 'react';

export const BetslipList = () => {
  const { betslip, removeSelection } = useBetslip();
  const { events } = useEvents();

  const deleteSelection = (selection: Selection) => () => {
    removeSelection(selection);
  };

  const marketsRecord = useMemo(() => {
    const entries = events.flatMap(({ markets }) =>
      markets.flatMap((market) =>
        market.selections.map(({ id }) => [id, market]),
      ),
    );
    return Object.fromEntries(entries);
  }, [events]);

  const getMarket = (selection: Selection): Market | null => {
    return selection.id && marketsRecord[selection.id] || null;
  };

  return (
    <List>
      {betslip.selections.map((selection) => (
        <ListItem key={selection.id}>
          <Box sx={{ textAlign: 'center', width: '100%' }}>
            <Typography variant="h5">{selection.name}</Typography>
            <ListItemText>
              {selection.price} | {getMarket(selection)?.name}
            </ListItemText>
            <Button variant="contained" onClick={deleteSelection(selection)}>
              Delete
            </Button>
            <Divider sx={{ marginTop: 2 }} />
          </Box>
        </ListItem>
      ))}
    </List>
  );
};
