import { Market } from '@domain';
import { RawMarket } from './types';
import { SelectionMapper } from './selection.mapper';

export class MarketMapper {
  static fromRaw(rawMarket: RawMarket): Market {
    return Market.of(
      rawMarket.name,
      rawMarket.selections.map((rawSelection) =>
        SelectionMapper.fromRaw(rawSelection),
      ),
      rawMarket.id,
    );
  }

  static toRaw(market: Market): RawMarket {
    return {
      name: market.name,
      selections: market.selections.map((selection) =>
        SelectionMapper.toRaw(selection),
      ),
      ...(market.id && {
        id: market.id,
      }),
    };
  }
}
