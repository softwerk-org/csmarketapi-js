CSMarketAPI Client (TypeScript)

Asynchronous TypeScript client for `CSMarketAPI` — typed interfaces, enums for marketplaces/currencies, and a simple fetch-based client. Works with Bun and modern Node runtimes.

Installation
```bash
bun add csmarketapi
```

Quickstart
```ts
import { CSMarketAPI, Market, Currency } from "csmarketapi"

const client = new CSMarketAPI({ apiKey: process.env.API_KEY! })
const items = await client.getItems()
console.log(items.items.length)
```

API
- Listings: `getListingsLatestAggregated({ marketHashName, markets, currency?, maxAge? })`, `getListingsHistoryAggregated({ marketHashName, markets, currency?, maxAge? })`
- Sales: `getSalesLatestAggregated({ marketHashName, markets, currency? })`, `getSalesHistoryAggregated({ marketHashName, markets, start?, end?, currency? })`
- Meta: `getItems()`, `getCurrencyRates()`, `getPlayerCountsLatest()`, `getPlayerCountsHistory({ start?, end? })`
- Steam: `getSteamProfile({ steamId })`, `getSteamInventory({ steamId })`, `getSteamFriendslist({ steamId })`
- Float: `getFloatInfo({ inspectLink })`

License
MIT

Release
```bash
# 1) bump version in package.json
# 2) tag and push
git commit -am "release: v0.1.0"
git tag v0.1.0
git push && git push --tags
# GitHub Action builds and publishes with bun
```
