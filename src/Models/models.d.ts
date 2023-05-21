export type Source = "Binance" | "Celcius" | "Ethereum" | "Polygon" | "BSC";

export type TransactionType =
  | "Withdraw"
  | "Deposit"
  | "Mining"
  | "Skip"
  | "Distribution";

export type ContractType =
  | "LiquidPool"
  | "LiquidPool/Swap"
  | "Distribution"
  | "Gauge"
  | "Gauged/Swap"
  | "Swap"
  | "AAVE"
  | "Ignore"
  | "Note";

export interface Contract {
  name: string;
  address: string;
  type: ContractType;
}

export interface Eventti {
  hash: string;
  source: Source;
  timestring: string;
  // todo: symbolit haetaan jostain enumista?
  symbol: string;
  event_type: TransactionType;
  contract: Contract;
  amount: number;
  rate: number;
  value: number;
  notes: string[];
}
