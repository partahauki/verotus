import { describe, it, expect, jest, afterEach } from "@jest/globals";
import { fetchTransactions, getBlockRangeInTaxYear } from "./fetchTransactions";
import { fetchBlock, fetchTransactionsFromUrl } from "./apiClient";
import {
  ehterNormalTrxsComplete,
  ehterNormalTrxsRaw,
  polygonERC20TrxsComplete,
  polygonERC20TrxsRaw,
  polygonInternalTrxsComplete,
  polygonInternalTrxsRaw,
  polygonNormalTrxsComplete,
  polygonNormalTrxsRaw,
} from "./mockData";

jest.mock("./apiClient");

const mockFetchBlock = fetchBlock as jest.Mocked<typeof fetchBlock>;
let mockFetchBlockCallCount = 0;
mockFetchBlock.mockImplementation(async (url: string) => {
  mockFetchBlockCallCount++;
  return mockFetchBlockCallCount % 2 === 1
    ? await Promise.resolve("1234")
    : await Promise.resolve("2345");
});

const mockFetchTransactionsFromUrl = fetchTransactionsFromUrl as jest.Mocked<
  typeof fetchTransactionsFromUrl
>;
mockFetchTransactionsFromUrl.mockImplementation(async (url: string) => {
  if (url.includes("ether") && url.includes("action=txlist&")) {
    return await Promise.resolve(ehterNormalTrxsRaw);
  } else if (url.includes("polygon") && url.includes("action=txlist&")) {
    return await Promise.resolve(polygonNormalTrxsRaw);
  } else if (url.includes("polygon") && url.includes("action=txlistinternal&")) {
    return await Promise.resolve(polygonInternalTrxsRaw);
  } else if (url.includes("polygon") && url.includes("action=tokentx&")) {
    return await Promise.resolve(polygonERC20TrxsRaw);
  } else {
    throw Error("invalid url for mockFetchTransactionsFromUrl: " + url);
  }
});

describe("FetchTransactions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("queries endpoints correctly and returns results", async () => {
    const results = await fetchTransactions("test-wallet");

    expect(mockFetchBlock).toHaveBeenCalledTimes(4);
    expect(mockFetchTransactionsFromUrl).toHaveBeenCalledTimes(4);
    expect(mockFetchTransactionsFromUrl).toHaveBeenCalledWith(
      `https://${"api.etherscan.io"}/api?module=account&action=txlist&address=${"test-wallet"}&startblock=${"1234"}&endblock=${"2345"}&sort=asc&apikey=${"etherscan-key"}`
    );
    expect(mockFetchTransactionsFromUrl).toHaveBeenCalledWith(
      `https://${"api.polygonscan.com"}/api?module=account&action=txlist&address=${"test-wallet"}&startblock=${"1234"}&endblock=${"2345"}&sort=asc&apikey=${"polygon-key"}`
    );
    expect(mockFetchTransactionsFromUrl).toHaveBeenCalledWith(
      `https://${"api.polygonscan.com"}/api?module=account&action=txlistinternal&address=${"test-wallet"}&startblock=${"1234"}&endblock=${"2345"}&sort=asc&apikey=${"polygon-key"}`
    );
    expect(mockFetchTransactionsFromUrl).toHaveBeenCalledWith(
      `https://${"api.polygonscan.com"}/api?module=account&action=tokentx&address=${"test-wallet"}&startblock=${"1234"}&endblock=${"2345"}&sort=asc&apikey=${"polygon-key"}`
    );
    expect(results).toEqual(
      expect.arrayContaining([
        ...ehterNormalTrxsComplete,
        ...polygonNormalTrxsComplete,
        ...polygonInternalTrxsComplete,
        ...polygonERC20TrxsComplete,
      ])
    );
  });

  describe("fetchBlockRangeInTaxYear", () => {
    it("generates correct urls and returns results", async () => {
      const result = await getBlockRangeInTaxYear("test.fi", "etherscan-key");

      expect(mockFetchBlock).toHaveBeenCalledTimes(2);
      expect(mockFetchBlock).toHaveBeenCalledWith(
        `https://test.fi/api?module=block&action=getblocknobytime&timestamp=1609452000&closest=after&apikey=${"etherscan-key"}`
      );
      expect(mockFetchBlock).toHaveBeenCalledWith(
        `https://test.fi/api?module=block&action=getblocknobytime&timestamp=1640988000&closest=before&apikey=${"etherscan-key"}`
      );

      expect(result).toStrictEqual(["1234", "2345"]);
    });
  });
});
