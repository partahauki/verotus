import type { RatelessEvent } from "../Models/models";

export function isSymbolWhitelisted(symbol: string, whitelist: string[]): boolean {
  return whitelist.find((x) => x === symbol) !== undefined;
}

export function printEvents(events: RatelessEvent[]): void {
  const reset = "\x1b[0m";
  const red = "\x1b[31m";
  const green = "\x1b[32m";

  let printColor = red;
  let currentHash;
  for (const event of events) {
    const { hash, source, timestamp, symbol, eventType, contract } = event;
    if (hash !== currentHash) {
      currentHash = hash;
      printColor = printColor === red ? green : red;
    }
    console.log(
      `${printColor}hash: ${hash.slice(
        0,
        5
      )}, source: ${source}, timestamp: ${timestamp}, symbol: ${symbol}, eventType: ${eventType}, contract: ${
        contract !== null ? contract.name : ""
      }`
    );
  }
  console.log(reset);
}
