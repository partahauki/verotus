import type { Transaction } from "./scanner";

export function prepareTransactions(trxs: Transaction[]): Transaction[] {
  return sortByTimestamp(trxs);
}

function sortByTimestamp(trxs: Transaction[]): Transaction[] {
  return trxs.sort((a, b) => Number(a.timeStamp) - Number(b.timeStamp));
}
