import { Event, LoadEventsPort } from '@domain';
import { EventMapper, RawEvent } from '@mappers';

const delay = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export class EventAdapter implements LoadEventsPort {
  async loadEvents(): Promise<Event[]> {
    const rawEvents: RawEvent[] = await fetch(
      'http://www.mocky.io/v2/59f08692310000b4130e9f71',
    ).then((resp) => resp.json());
    await delay(1500);
    return rawEvents.map((rawEvent) => EventMapper.fromRaw(rawEvent));
  }
}
