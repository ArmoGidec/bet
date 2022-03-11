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

export const BetslipList = () => {
  const { betslip, removeSelection } = useBetslip();
  const { events } = useEvents();

  const deleteSelection = (selection: Selection) => () => {
    removeSelection(selection);
  };

  const getMarket = (selection: Selection): Market | null => {
    for (const event of events) {
      const market = event.markets.find(
        ({ selections }) => !!selections.find(({ id }) => selection.id === id),
      );

      if (market) {
        return market;
      }
    }
    return null;
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
