import { EventService } from "@domain";
import { EventAdapter } from "./event.adapter";

export const eventService = new EventService(new EventAdapter());
