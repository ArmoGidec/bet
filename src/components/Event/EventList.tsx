import { EventItem } from './EventItem';
import { Container, Grid, LinearProgress } from '@mui/material';
import { useEvents } from '@hooks';

export const EventList = () => {
  const { isLoading, events } = useEvents();

  return (
    <>
      {isLoading && <LinearProgress />}
      <Container>
        <Grid container spacing={2}>
          {events.map((event) => (
            <EventItem key={event.id} event={event} />
          ))}
        </Grid>
      </Container>
    </>
  );
};
