import env from "../../environment";
import type { RatelessEvent } from "../Models/models";
import { quitRedis, initRedis } from "../Utils/redis";
import { printEvents } from "../Utils/utils";
import { fetchTransactions } from "./fetchTransactions";
import { prepareTransactions } from "./prepareTransactions";
import type { Transaction } from "./scanner";
import { transactionsToEvents } from "./transactionsToEvents";

export const debugArray: string[] = [];

export async function ScanWallets(): Promise<RatelessEvent[]> {
  const trxs: Transaction[] = [];

  await initRedis();

  for (const wallet of env.WALLETS) {
    const fetchedTransactions = await fetchTransactions(wallet);
    trxs.push(...fetchedTransactions);
  }

  const preparedTransactions = prepareTransactions(trxs);
  const ratelessEvents: RatelessEvent[] = transactionsToEvents(preparedTransactions);

  await quitRedis();

  printEvents(ratelessEvents);

  return ratelessEvents;
}
