import { Market } from '@domain';
import { Box, Grid, Typography } from '@mui/material';
import { SelectionItem } from '@components/Selection';

interface MarketItemProps {
  market: Market;
}

export function MarketItem({ market }: MarketItemProps) {
  return <Box sx={ { padding: 2 } }>
    <Typography mb={ 1 } color={ 'darkgrey' }>{ market.name }</Typography>
    <Grid container sx={ { justifyContent: 'space-between' } }>
      { market.selections.map(
        (selection) =>
          <SelectionItem key={ selection.id } selection={ selection } market={ market } />,
      ) }
    </Grid>
  </Box>;
}
