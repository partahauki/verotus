export type Source = "Binance" | "Celcius" | "Ethereum" | "Polygon" | "BSC";

export type ContractType =
  | "AAVE"
  | "distribution"
  | "gauge"
  | "gauged/swap"
  | "ignore"
  | "liquidPool"
  | "liquidPool/swap"
  | "swap"
  | "note";

export interface Contract {
  name: string;
  address: string;
  type: ContractType;
}

export type EventType =
  | "buy"
  | "distribution"
  | "fee"
  | "future"
  | "remuneration"
  | "sell"
  | "skip"
  | "withdraw";

export interface RatelessEvent {
  hash: string;
  source: string;
  timestamp: string;
  symbol: string;
  eventType: EventType;
  amount: number;
  contract: Contract | null;
  notes: string[];
}

export interface Event extends RatelessEvent {
  rate: number;
  value: number;
}
