import env from "../../environment";
import { type Eventti } from "../Models/models";
import { quitRedis, initRedis } from "../Utils/redis";
import { fetchTransactions } from "./fetchTransactions";
import { prepareTransactions } from "./prepareTransactions";

export async function ScanWallets(): Promise<Eventti[]> {
  const events: Eventti[] = [];

  await initRedis();
  for (const wallet of env.WALLETS) {
    const fetchedTransactions = await fetchTransactions(wallet);
    const preparedTransactions = prepareTransactions(fetchedTransactions);
    console.log(preparedTransactions.length);
    // events.push(...createEventsFromTransactions(preparedTransactions));
    // const preparedTransactions = prepareTransactions(transactions);
    // const groupedTransactions = groupTransactions(preparedTransactions);
    // transactions.push(
    // ...generateFinalTransactionsFromGroups(groupedTransactions)
    // );
  }

  await quitRedis();

  return events;
}
