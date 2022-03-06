import { Event } from '@domain';
import { Card, CardContent, CardHeader, Divider, Grid } from '@mui/material';
import { MarketItem } from '@components';
import { Fragment } from 'react';

interface EventItemProps {
  event: Event;
}

export function EventItem({ event }: EventItemProps) {
  if (!event.markets.length) {
    return null;
  }

  return (
    <Grid item xs={ 12 } sm={ 6 } md={ 4 }>
      <Card>
        <CardHeader title={ event.name } sx={ { textAlign: 'center' } } />
        <CardContent>
          { event.markets.map((market) =>
            <Fragment key={ market.id }>
              <Divider />
              <MarketItem market={ market } />
            </Fragment>,
          ) }
        </CardContent>
      </Card>
    </Grid>
  );
}
