import { CSMarketAPI, Market, Currency } from '../src/index';
import { test, expect, beforeAll, describe } from 'bun:test';

const apiKey = process.env.API_KEY;
let client: CSMarketAPI | undefined;

beforeAll(() => {
  if (!apiKey) {
    console.log('Skipping all tests - API_KEY not set');
    client = undefined;
    return;
  }
  client = new CSMarketAPI({ apiKey });
});

describe('CSMarketAPI Tests', () => {
  test('getItems', async () => {
    if (!client) return;
    expect(await client.getItems()).toBeDefined();
  });

  test('getMarkets', async () => {
    if (!client) return;
    expect(await client.getMarkets()).toBeDefined();
  });

  test('getCurrencyRates', async () => {
    if (!client) return;
    expect(await client.getCurrencyRates()).toBeDefined();
  });

  test('getPlayerCountsLatest', async () => {
    if (!client) return;
    expect(await client.getPlayerCountsLatest()).toBeDefined();
  });

  test('getPlayerCountsHistory', async () => {
    if (!client) return;
    expect(await client.getPlayerCountsHistory()).toBeDefined();
  });

  test('getListingsLatestAggregated', async () => {
    if (!client) return;
    expect(await client.getListingsLatestAggregated({
      marketHashName: 'Shadow Case',
      currency: Currency.USD
    })).toBeDefined();
  });

  test('getListingsHistoryAggregated', async () => {
    if (!client) return;
    expect(await client.getListingsHistoryAggregated({
      marketHashName: 'Shadow Case',
      markets: [Market.STEAMCOMMUNITY],
      currency: Currency.USD
    })).toBeDefined();
  });

  test('getSalesLatestAggregated', async () => {
    if (!client) return;
    expect(await client.getSalesLatestAggregated({
      marketHashName: 'Shadow Case',
      markets: [Market.STEAMCOMMUNITY],
      currency: Currency.USD
    })).toBeDefined();
  });

  test('getSalesHistoryAggregated', async () => {
    if (!client) return;
    expect(await client.getSalesHistoryAggregated({
      marketHashName: 'Shadow Case',
      markets: [Market.STEAMCOMMUNITY],
      currency: Currency.USD
    })).toBeDefined();
  });
});
