import { Event } from "../../entities";

export interface GetEventsQuery {
  getEvents(): Promise<Event[]>;
}
