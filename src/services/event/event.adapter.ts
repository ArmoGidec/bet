import { Event, LoadEventsPort } from '@domain';
import { EventMapper, RawEvent } from '@mappers';

export class EventAdapter implements LoadEventsPort {
  async loadEvents(): Promise<Event[]> {
    const response = await fetch(
      'http://www.mocky.io/v2/59f08692310000b4130e9f71',
    );
    const rawEvents: RawEvent[] = await response.json();

    return rawEvents.map((rawEvent) => EventMapper.fromRaw(rawEvent));
  }
}
