import { EventAdapter } from './event.adapter';
import { Event, LoadEventsPort } from '@domain';
import { useEffect, useState } from 'react';

const eventAdapter = new EventAdapter();

const loadEvents: LoadEventsPort['loadEvents'] = () => eventAdapter.loadEvents();

export function useEvents(): {
  events: Event[],
  isLoading: boolean,
} {
  const [isLoading, setLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchEvents = async () => {
      setLoading(true);
      try {
        setEvents(await loadEvents());
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
    () => {
      abortController.abort();
    };
  }, []);

  return {
    events,
    isLoading,
  };
}

