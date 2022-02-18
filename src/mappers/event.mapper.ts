import { Event } from '@domain';
import { RawEvent } from './types';
import { MarketMapper } from './market.mapper';

export class EventMapper {
  static fromRaw(rawEvent: RawEvent): Event {
    return Event.of(
      rawEvent.name,
      rawEvent.markets.map((rawMarket) => MarketMapper.fromRaw(rawMarket)),
      rawEvent.id,
    );
  }

  static toRaw(event: Event): RawEvent {
    return {
      name: event.name,
      markets: event.markets.map((market) => MarketMapper.toRaw(market)),
      ...(event.id && {
        id: event.id,
      }),
    };
  }
}
