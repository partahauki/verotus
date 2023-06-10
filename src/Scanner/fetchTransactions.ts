import {
  type Transaction,
  type Urls,
  type InternalTransactionRaw,
  type NormalTransactionRaw,
  type ERC20TransactionRaw,
} from "./scanner";

import env from "../../environment";

import { DateTime } from "luxon";
import { fetchBlock, fetchTransactionsFromUrl } from "./apiClient";

export async function fetchTransactions(wallet: string): Promise<Transaction[]> {
  const toFetch = [];
  env.FETCH_ETHER_EVENTS && toFetch.push(getEthereumTransactions(wallet));
  env.FETCH_POLYGON_EVENTS && toFetch.push(getPolygonTransactions(wallet));
  // env.FETCH_BSC_EVENTS && toFetch.push(getBSCTransactions(wallet));

  return (await Promise.all(toFetch)).flat(2);
}

function generateUrlsForWallet(
  wallet: string,
  urlBase: string,
  startBlock: string,
  endBlock: string,
  apiKey: string
): Urls {
  return {
    normal: `https://${urlBase}/api?module=account&action=txlist&address=${wallet}&startblock=${startBlock}&endblock=${endBlock}&sort=asc&apikey=${apiKey}`,
    erc20: `https://${urlBase}/api?module=account&action=tokentx&address=${wallet}&startblock=${startBlock}&endblock=${endBlock}&sort=asc&apikey=${apiKey}`,
    internal: `https://${urlBase}/api?module=account&action=txlistinternal&address=${wallet}&startblock=${startBlock}&endblock=${endBlock}&sort=asc&apikey=${apiKey}`,
  };
}

export async function getBlockRangeInTaxYear(
  urlBase: string,
  apiKey: string
): Promise<[string, string]> {
  const taxYearStart = DateTime.fromObject({ year: env.TAX_YEAR }).toSeconds();
  const taxYearEnd = DateTime.fromObject({
    year: env.TAX_YEAR + 1,
  }).toSeconds();
  const urlStart = `https://${urlBase}/api?module=block&action=getblocknobytime&timestamp=${taxYearStart}&closest=after&apikey=${apiKey}`;
  const urlEnd = `https://${urlBase}/api?module=block&action=getblocknobytime&timestamp=${taxYearEnd}&closest=before&apikey=${apiKey}`;

  return await Promise.all([fetchBlock(urlStart), fetchBlock(urlEnd)]);
}

async function getEthereumTransactions(wallet: string): Promise<Transaction[]> {
  const urlBase = "api.etherscan.io";
  const transactions: Transaction[] = [];

  const [startBlock, endBlock] = await getBlockRangeInTaxYear(urlBase, env.KEY_ETHER_SCAN);

  const urls = generateUrlsForWallet(wallet, urlBase, startBlock, endBlock, env.KEY_ETHER_SCAN);

  if (urls.normal !== undefined) {
    const trxs = (await fetchTransactionsFromUrl(urls.normal)) as NormalTransactionRaw[];
    transactions.push(
      ...trxs.map((t) => {
        return {
          ...t,
          type: "normal" as const,
          tokenDecimal: "18",
          tokenSymbol: "ETH",
          source: "Ethereum" as const,
        };
      })
    );
  }

  return transactions;
}

async function getPolygonTransactions(wallet: string): Promise<Transaction[]> {
  const urlBase = "api.polygonscan.com";
  const transactions: Transaction[] = [];

  const [startBlock, endBlock] = await getBlockRangeInTaxYear(urlBase, env.KEY_POLYGON_SCAN);

  const urls = generateUrlsForWallet(wallet, urlBase, startBlock, endBlock, env.KEY_POLYGON_SCAN);

  if (urls.normal !== undefined) {
    const trxs = (await fetchTransactionsFromUrl(urls.normal)) as NormalTransactionRaw[];
    transactions.push(
      ...trxs.map((t) => ({
        ...t,
        type: "normal" as const,
        source: "Polygon" as const,
        ...(t.value !== "0" ? { tokenSymbol: "MATIC", tokenDecimal: "18" } : {}),
      }))
    );
  }
  if (urls.internal !== undefined) {
    const trxs = (await fetchTransactionsFromUrl(urls.internal)) as InternalTransactionRaw[];
    transactions.push(
      ...trxs.map((t) => ({
        ...t,
        type: "internal" as const,
        source: "Polygon" as const,
        tokenSymbol: "MATIC",
        tokenDecimal: "18",
      }))
    );
  }
  if (urls.erc20 !== undefined) {
    const trxs = (await fetchTransactionsFromUrl(urls.erc20)) as ERC20TransactionRaw[];
    transactions.push(
      ...trxs.map((t) => ({
        ...t,
        type: "erc20" as const,
        source: "Polygon" as const,
      }))
    );
  }

  return transactions;
}
