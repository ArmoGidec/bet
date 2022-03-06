import { Event } from "../../entities";

export interface LoadEventsPort {
  loadEvents(): Promise<Event[]>;
}
