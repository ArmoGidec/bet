import { Event, EventService, LoadEventsPort } from '@domain';
import { EventMapper, RawEvent } from '@mappers';
import {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';

const delay = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const EventsContext = createContext<{
  events: Event[];
  isLoading: boolean;
}>({ events: [], isLoading: false });

export const EventsProvider: FC = ({ children }) => {
  const abortController = new AbortController();

  const loadEventsPort: LoadEventsPort = {
    loadEvents: async (): Promise<Event[]> => {
      const rawEvents: RawEvent[] = await fetch(
        'http://www.mocky.io/v2/59f08692310000b4130e9f71',
        {
          signal: abortController.signal,
        },
      ).then((resp) => resp.json());

      await delay(1500);

      return rawEvents.map((rawEvent) => EventMapper.fromRaw(rawEvent));
    },
  };

  const eventService = new EventService(loadEventsPort);

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
      abortController.abort();
    };
  }, []);

  return (
    <EventsContext.Provider value={{ events, isLoading }}>
      {children}
    </EventsContext.Provider>
  );
};

export function useEvents(): { events: Event[]; isLoading: boolean } {
  return useContext(EventsContext);
}
