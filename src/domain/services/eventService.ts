import { Event } from '../entities';
import { GetEventsQuery } from '../ports';
import { LoadEventsPort } from '../ports/out/loadEvents.port';

export class EventService implements GetEventsQuery {
  constructor(private readonly _loadEvents: LoadEventsPort) {}

  getEvents(): Promise<Event[]> {
    return this._loadEvents.loadEvents();
  }
}
