import type { Market } from "./enums";

export interface ListingsLatestAggregated {
  market_hash_name: string
  listings: Array<{
    id: number
    market: Market
    market_link: string
    mean_price: number | null
    min_price: number | null
    max_price: number | null
    median_price: number | null
    listings: number
    timestamp: string
  }>
}

export interface ListingsHistoryAggregated {
  items: Array<{
    timestamp: string
    listings: Array<{
      id: number
      market: Market
      mean_price: number | null
      min_price: number | null
      max_price: number | null
      median_price: number | null
      listings: number
    }>
  }>
}

export interface SalesLatestAggregated {
  market_hash_name: string
  sales: Array<{
    id: number
    market: Market
    mean_price: number | null
    min_price: number | null
    max_price: number | null
    median_price: number | null
    volume: number | null
    day: string
  }>
}

export interface SalesHistoryAggregated {
  items: Array<{
    day: string
    sales: Array<{
      id: number
      market: Market
      mean_price: number | null
      min_price: number | null
      max_price: number | null
      median_price: number | null
      volume: number | null
    }>
  }>
}

export interface Items {
  items: Array<{
    market_hash_name: string
    hash_name: string
    nameid?: number | null
    classid?: string | null
    exterior?: string | null
    category?: string | null
    weapon?: string | null
    max_sticker_amount?: number | null
    used_by_class?: string | null
    quality?: string | null
    type?: string | null
    sticker_type?: string | null
    graffiti_type?: string | null
    patch_type?: string | null
    collection?: string | null
    sticker_collection?: string | null
    graffiti_collection?: string | null
    patch_collection?: string | null
    graffiti_color?: string | null
    professional_player?: string | null
    tournament?: string | null
    team?: string | null
    min_float?: number | null
    max_float?: number | null
    droppool?: string | null
    release_dt?: string | null
    akamai_icon_url?: string | null
    cloudflare_icon_url?: string | null
  }>
}

export interface CurrencyRates {
  items: Array<{
    currency_code: string
    currency_name: string
    currency_symbol: string
    rate: number
    timestamp: string
  }>
}

export interface PlayerCountsLatest {
  timestamp: string
  count: number
}

export interface PlayerCountsHistory {
  items: Array<{
    timestamp: string
    count: number
  }>
}

export interface SteamProfile {
  data: unknown
}

export interface SteamInventoryAsset {
  assetid: string
  classid: string
  instanceid?: string | null
  contextid?: string | null
  market_hash_name?: string | null
  icon_url?: string | null
  name?: string | null
  type?: string | null
  tradable?: boolean | null
  marketable?: boolean | null
  inspect_link?: string | null
}

export interface SteamInventory {
  steam_id: string
  assets: Array<SteamInventoryAsset>
}

export interface SteamFriendslist {
  data: unknown
}

export interface FloatInfo {
  time?: number | null
  url?: string | null
  iteminfo?: Record<string, unknown> | null
  status?: unknown | null
}


