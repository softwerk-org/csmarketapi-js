import { Currency, Market } from "./enums";
import type {
    CurrencyRates,
    Items,
    ListingsHistoryAggregated,
    ListingsLatestAggregated,
    Markets,
    PlayerCountsHistory,
    PlayerCountsLatest,
    SalesHistoryAggregated,
    SalesLatestAggregated
} from "./models";
import {
    ItemsModel,
    CurrencyRatesModel,
    PlayerCountsLatestModel,
    PlayerCountsHistoryModel,
    ListingsLatestAggregatedModel,
    ListingsHistoryAggregatedModel,
    SalesLatestAggregatedModel,
    SalesHistoryAggregatedModel,
    MarketsModel
} from "./models";

type FetchLike = typeof fetch

export type ClientOptions = {
    apiKey: string
    fetch?: FetchLike
}

export class CSMarketAPI {
    private baseUrl: string = "https://api.csmarketapi.com"
    private apiKey: string
    private fetchImpl: FetchLike

    constructor(options: ClientOptions | string) {
        if (typeof options === "string") {
            this.apiKey = options
            this.fetchImpl = fetch
        } else {
            this.apiKey = options.apiKey
            this.fetchImpl = options.fetch ?? fetch
        }
    }

    private toParamValue(v: unknown): string {
        if (v instanceof Date) return v.toISOString()
        return String(v)
    }

    private buildUrl(path: string, params?: Record<string, unknown>): string {
        const url = new URL(path, this.baseUrl)
        const allParams: Record<string, unknown> = { key: this.apiKey, ...(params ?? {}) }
        for (const [key, value] of Object.entries(allParams)) {
            if (value == null){
                continue
            }
            const values = Array.isArray(value) ? value : [value]
            for (const v of values) { 
                url.searchParams.append(key, this.toParamValue(v)) 
            }
        }
        return url.toString()
    }

    private async request<T>(path: string, params?: Record<string, unknown>): Promise<T> {
        const url = this.buildUrl(path, params)
        const r = await this.fetchImpl(url, { redirect: "follow" })
        if (!r.ok) {
            const text = await r.text().catch(() => "")
            throw new Error(`HTTP ${r.status} ${r.statusText} ${text}`)
        }
        return r.json() as Promise<T>
    }

    async getListingsLatestAggregated(args: {
        marketHashName: string
        markets?: ReadonlyArray<Market>
        currency?: Currency
        maxAge?: string | null
    }): Promise<ListingsLatestAggregated> {
        const { marketHashName, markets, currency = Currency.USD, maxAge } = args
        const result = await this.request<ListingsLatestAggregated>("/v1/listings/latest/aggregate", {
            market_hash_name: marketHashName,
            markets,
            currency,
            ...(maxAge ? { max_age: maxAge } : {})
        })
        return ListingsLatestAggregatedModel.parse(result) 
    }

    async getListingsHistoryAggregated(args: {
        marketHashName: string
        markets?: ReadonlyArray<Market>
        currency?: Currency
        maxAge?: string | null
    }): Promise<ListingsHistoryAggregated> {
        const { marketHashName, markets, currency = Currency.USD, maxAge } = args
        const items = await this.request<ListingsHistoryAggregated["items"]>(
            "/v1/listings/history/aggregate",
            {
                market_hash_name: marketHashName,
                markets,
                currency,
                ...(maxAge ? { max_age: maxAge } : {})
            }
        )
        const result = { items }
        return ListingsHistoryAggregatedModel.parse(result) 
    }

    async getSalesLatestAggregated(args: {
        marketHashName: string
        markets?: ReadonlyArray<Market>
        currency?: Currency
    }): Promise<SalesLatestAggregated> {
        const { marketHashName, markets, currency = Currency.USD } = args
        const result = await this.request<SalesLatestAggregated>("/v1/sales/latest/aggregate", {
            market_hash_name: marketHashName,
            markets,
            currency
        })
        return SalesLatestAggregatedModel.parse(result) 
    }

    async getSalesHistoryAggregated(args: {
        marketHashName: string
        markets?: ReadonlyArray<Market>
        start?: string | Date | null
        end?: string | Date | null
        currency?: Currency
    }): Promise<SalesHistoryAggregated> {
        const { marketHashName, markets, start, end, currency = Currency.USD } = args
        const items = await this.request<SalesHistoryAggregated["items"]>(
            "/v1/sales/history/aggregate",
            {
                market_hash_name: marketHashName,
                markets,
                ...(start ? { start } : {}),
                ...(end ? { end } : {}),
                currency
            }
        )
        const result = { items }
        return SalesHistoryAggregatedModel.parse(result) 
    }

    async getItems(): Promise<Items> {
        const items = await this.request<Items["items"]>("/v1/items")
        const result = { items }
        return ItemsModel.parse(result) 
    }

    async getMarkets(): Promise<Markets> {
        const result = await this.request<Markets>("/v1/markets")
        return MarketsModel.parse(result) 
    }

    async getCurrencyRates(): Promise<CurrencyRates> {
        const items = await this.request<CurrencyRates["items"]>("/v1/currency_rates")
        const result = { items }
        return CurrencyRatesModel.parse(result) 
    }

    async getPlayerCountsLatest(): Promise<PlayerCountsLatest> {
        const result = await this.request<PlayerCountsLatest>("/v1/player_counts/latest")
        return PlayerCountsLatestModel.parse(result) 
    }

    async getPlayerCountsHistory(args?: { start?: string | Date | null; end?: string | Date | null }): Promise<PlayerCountsHistory> {
        const { start, end } = args ?? {}
        const items = await this.request<PlayerCountsHistory["items"]>("/v1/player_counts/history", {
            ...(start ? { start } : {}),
            ...(end ? { end } : {})
        })
        const result = { items }
        return PlayerCountsHistoryModel.parse(result)
    }
}

export { Market, Currency }


