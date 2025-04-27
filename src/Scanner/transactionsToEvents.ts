import type { Transaction } from "./scanner";
import type { Contract, EventType, RatelessEvent } from "../Models/models";
import assert from "assert";
import { allContracts, whitelistAllTokens, whitelistPoolTokens } from "./enums";
import { isSymbolWhitelisted } from "../Utils/utils";
import env from "../../environment";

type HashGroupedTrxs = Record<string, Transaction[]>;

let groupedTransactions: HashGroupedTrxs = {};

export function transactionsToEvents(trxs: Transaction[]): RatelessEvent[] {
  const events: RatelessEvent[] = [];

  const hashGroupedTrxs = groupTransactionsByHash(trxs);

  Object.entries(hashGroupedTrxs).forEach(([_hash, trxs]) => {
    events.push(...createEventsFromGroup(trxs));
  });

  return events;
}

function groupTransactionsByHash(trxs: Transaction[]): HashGroupedTrxs {
  const hashGroupedTransactions: HashGroupedTrxs = trxs.reduce((acc: HashGroupedTrxs, curr) => {
    acc[curr.hash] !== undefined ? acc[curr.hash].push(curr) : (acc[curr.hash] = [curr]);
    return acc;
  }, {});

  groupedTransactions = hashGroupedTransactions;
  return hashGroupedTransactions;
}

function createEventsFromGroup(trxGroup: Transaction[]): RatelessEvent[] {
  const newEvents: RatelessEvent[] = [];

  const contract = determineUsedContract(trxGroup);

  for (const trx of trxGroup) {
    if (willTrxBeDiscarded(trx)) {
      continue;
    }
    assert(
      trx.tokenSymbol !== undefined && trx.tokenDecimal !== undefined,
      "Normal transactions without token values should have been filtered out already"
    );

    // todo: Erikoistapauksien händläys muualle?
    if (trx.tokenSymbol === "WMATIC") {
      trx.tokenSymbol = "MATIC";
    }

    const eventType = determineEventType(trx as Required<Transaction>, contract);
    let amount = Number(trx.value) / 10 ** Number(trx.tokenDecimal);
    if (["sell", "withdraw"].includes(eventType)) {
      amount *= -1;
    }

    newEvents.push({
      hash: trx.hash,
      source: trx.source,
      timestamp: trx.timeStamp,
      symbol: trx.tokenSymbol,
      eventType,
      amount,
      contract,
      notes: [],
    });
  }

  return newEvents;
}

function determineUsedContract(trxGroup: Transaction[]): Contract | null {
  const contractAddress = trxGroup.find((trx) => trx.type === "normal")?.to;

  if (contractAddress !== undefined) {
    return allContracts.find((contract) => contract.address === contractAddress) ?? null;
  } else {
    return null;
  }
}

function willTrxBeDiscarded(trx: Transaction): boolean {
  if (trx.value === "0") {
    return true;
  } else if (
    trx.tokenSymbol !== undefined &&
    !isSymbolWhitelisted(trx.tokenSymbol, whitelistAllTokens)
  ) {
    return true;
  }

  return false;
}

function determineEventType(trx: Required<Transaction>, contract: Contract | null): EventType {
  const wallets = env.WALLETS;
  let baseType: "buy" | "sell" | "skip" | "remuneration";

  const toAddress = trx.to.toLocaleLowerCase();
  const fromAddress = trx.from.toLocaleLowerCase();

  if (wallets.includes(toAddress) && env.MINING_WALLETS.includes(fromAddress)) {
    baseType = "remuneration";
  } else if (wallets.includes(fromAddress) && wallets.includes(toAddress)) {
    baseType = "skip";
  } else if (wallets.includes(toAddress)) {
    baseType = "buy";
  } else if (wallets.includes(fromAddress)) {
    baseType = "sell";
  } else {
    throw Error(`Cannot determine basetype from transaction: ${JSON.stringify(trx)}`);
  }

  if (contract === null) {
    return baseType;
  }

  if (contract.type === "distribution") {
    if (baseType === "buy") {
      return "distribution";
    }
  }
  if (contract.type === "gauge") {
    if (isSymbolWhitelisted(trx.tokenSymbol, whitelistPoolTokens)) {
      return "skip";
    }
    if (baseType === "buy") {
      return "distribution";
    }
  }
  if (contract.type === "gauged/swap") {
    if (isSymbolWhitelisted(trx.tokenSymbol, whitelistPoolTokens)) {
      return "skip";
    }
  }
  if (contract.type === "ignore") {
    return "skip";
  }
  if (contract.type === "AAVE") {
    return "skip";
  }

  return baseType;
}
