import { EventItem } from './EventItem';
import { Container, Grid, LinearProgress } from '@mui/material';
import { useEvents } from '@hooks';

export function EventList() {
  const { events, isLoading } = useEvents();

  return (
    <>
      { isLoading && <LinearProgress /> }
      <Container>
        <Grid container spacing={ 2 }>
          { events.map((event) => (
            <EventItem key={ event.id } event={ event } />
          )) }
        </Grid>
      </Container>
    </>
  );
}
