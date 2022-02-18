export type RawEvent = {
  id?: string | number;
  name: string;
  markets: RawMarket[];
};

export type RawMarket = {
  id?: string | number;
  name: string;
  selections: RawSelection[];
};

export type RawSelection = {
  id?: string | number;
  name: string;
  price: number;
};

export type RawBetslip = {
  selections: RawSelection[];
};
