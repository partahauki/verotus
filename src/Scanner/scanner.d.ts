import { Source } from "../Models/models";

export type BlockchainName = "Ethereum" | "Polygon" | "BSC";
export type TrxType = "normal" | "internal" | "erc20";

export type Urls = {
  erc20?: string;
  normal?: string;
  internal?: string;
};

export interface NormalTransaction {
  type: "normal";
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
  methodId: string;
  functionName: string;
  tokenSymbol?: string;
  tokenDecimal?: string;
  source: Source;
}

export type NormalTransactionRaw = Omit<
  NormalTransaction,
  "tokenSymbol" | "tokenDecimal" | "type" | "source"
>;

export interface InternalTransaction {
  type: "internal";
  blockNumber: string;
  timeStamp: string;
  hash: string;
  from: string;
  to: string;
  value: string;
  contractAddress: string;
  input: string;
  type: string;
  gas: string;
  gasUsed: string;
  traceId: string;
  isError: string;
  errCode: string;
  tokenSymbol: string;
  tokenDecimal: string;
  source: Source;
}

export type InternalTransactionRaw = Omit<
  InternalTransaction,
  "tokenSymbol" | "tokenDecimal" | "type" | "source"
>;

export interface ERC20Transaction {
  type: "erc20";
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  from: string;
  contractAddress: string;
  to: string;
  value: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: string;
  transactionIndex: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  cumulativeGasUsed: string;
  input: string;
  confirmations: string;
  source: Source;
}

export type ERC20TransactionRaw = Omit<ERC20Transaction, "type" | "source">;

export type Transaction = NormalTransaction | InternalTransaction | ERC20Transaction;

export type TransactionRaw = NormalTransactionRaw | InternalTransactionRaw | ERC20TransactionRaw;

export interface FetchTransactionsResponse {
  status: string;
  message: string;
  result?: TransactionRaw[];
}

export interface FetchBlockResponse {
  status: string;
  message: string;
  result?: string;
}
