import { CSMarketAPI, Market, Currency } from '../src/index';
import { test, expect, beforeAll, describe } from 'bun:test';

const apiKey = process.env.API_KEY;
let client: CSMarketAPI | undefined;

beforeAll(() => {
  if (!apiKey) {
    throw new Error('API_KEY environment variable is required for tests');
  }
  client = new CSMarketAPI({ apiKey });
});

describe('CSMarketAPI Tests', () => {
  test('getItems', async () => {
    expect(await client!.getItems()).toBeDefined();
  });

  test('getMarkets', async () => {
    expect(await client!.getMarkets()).toBeDefined();
  });

  test('getCurrencyRates', async () => {
    expect(await client!.getCurrencyRates()).toBeDefined();
  });

  test('getPlayerCountsLatest', async () => {
    expect(await client!.getPlayerCountsLatest()).toBeDefined();
  });

  test('getPlayerCountsHistory', async () => {
    expect(await client!.getPlayerCountsHistory()).toBeDefined();
  });

  test('getListingsLatestAggregated', async () => {
    expect(await client!.getListingsLatestAggregated({
      marketHashName: 'Shadow Case',
      currency: Currency.USD
    })).toBeDefined();
  });

  test('getListingsHistoryAggregated', async () => {
    expect(await client!.getListingsHistoryAggregated({
      marketHashName: 'Shadow Case',
      markets: [Market.STEAMCOMMUNITY],
      currency: Currency.USD
    })).toBeDefined();
  });

  test('getSalesLatestAggregated', async () => {
    expect(await client!.getSalesLatestAggregated({
      marketHashName: 'Shadow Case',
      markets: [Market.STEAMCOMMUNITY],
      currency: Currency.USD
    })).toBeDefined();
  });

  test('getSalesHistoryAggregated', async () => {
    expect(await client!.getSalesHistoryAggregated({
      marketHashName: 'Shadow Case',
      markets: [Market.STEAMCOMMUNITY],
      currency: Currency.USD
    })).toBeDefined();
  });
});
