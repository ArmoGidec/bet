import { EventItem } from './EventItem';
import { Container, Grid, LinearProgress } from '@mui/material';
import { useEvents } from '@hooks';
import { useEffect, useState } from 'react';
import { Event } from '@domain';
import { BetslipProvider } from '@hooks/useBetslip/useBetslip';

export const EventList = () => {
  const { eventService, abort } = useEvents();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setLoadingStatus] = useState(false);

  useEffect(() => {
    setLoadingStatus(true);
    eventService
      .getEvents()
      .then(setEvents)
      .finally(() => {
        setLoadingStatus(false);
      });

    return () => {
      abort();
    };
  }, []);

  return (
    <>
      {isLoading && <LinearProgress />}
      <Container>
        <Grid container spacing={2}>
          <BetslipProvider>
            {events.map((event) => (
              <EventItem key={event.id} event={event} />
            ))}
          </BetslipProvider>
        </Grid>
      </Container>
    </>
  );
};
