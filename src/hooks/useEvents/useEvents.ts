import { Event, EventService, LoadEventsPort } from '@domain';
import { EventMapper, RawEvent } from '@mappers';
import { useMemo } from 'react';

const delay = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export function useEvents(): { eventService: EventService; abort: () => void } {
  const abortController = useMemo(() => new AbortController(), []);

  const loadEventsPort = useMemo<LoadEventsPort>(() => {
    const loadEvents = async (): Promise<Event[]> => {
      const rawEvents: RawEvent[] = await fetch(
        'http://www.mocky.io/v2/59f08692310000b4130e9f71',
        {
          signal: abortController.signal,
        },
      ).then((resp) => resp.json());

      await delay(1500);

      return rawEvents.map((rawEvent) => EventMapper.fromRaw(rawEvent));
    };

    return {
      loadEvents,
    };
  }, [abortController]);

  const eventService = useMemo(
    () => new EventService(loadEventsPort),
    [loadEventsPort],
  );

  return {
    eventService,
    abort: () => abortController.abort,
  };
}
