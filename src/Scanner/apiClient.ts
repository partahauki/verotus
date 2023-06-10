import { redisClient } from "../Utils/redis";
import type { FetchBlockResponse, FetchTransactionsResponse, TransactionRaw } from "./scanner";

async function sleep(timeInMs: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, timeInMs));
}

export async function fetchBlock(url: string): Promise<string> {
  if (redisClient !== null) {
    const cachedResult = await redisClient.get(url);
    if (cachedResult !== "" && cachedResult !== null) {
      return cachedResult;
    }
  }

  console.log("Didn't use cache for " + url);
  const res = await fetch(url);
  await sleep(1000);
  if (res.ok) {
    const results: FetchBlockResponse = await res.json();
    if (results.result !== undefined) {
      if (redisClient !== null) {
        void redisClient.set(url, results.result);
      }
      return results.result;
    } else {
      throw new Error(`Something fishy with ${url}`);
    }
  } else {
    throw new Error(`Response from url ${url} failed with status ${res.status}`);
  }
}

export async function fetchTransactionsFromUrl(url: string): Promise<TransactionRaw[]> {
  if (redisClient !== null) {
    const cachedResult = await redisClient.get(url);
    if (cachedResult !== "" && cachedResult !== null) {
      return JSON.parse(cachedResult);
    }
  }

  console.log("Didn't use cache for " + url);
  const response = await fetch(url);
  await sleep(1000);
  if (response.ok) {
    const results: FetchTransactionsResponse = await response.json();
    if (results.result !== undefined) {
      if (redisClient !== null) {
        void redisClient.set(url, JSON.stringify(results.result));
      }
      return results.result;
    } else {
      throw new Error(`Something fishy with ${url}`);
    }
  } else {
    throw new Error(`Response from url ${url} failed with status ${response.status}`);
  }
}
