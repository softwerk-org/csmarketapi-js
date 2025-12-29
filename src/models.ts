import { z } from 'zod';
import { Market } from "./enums";

const ListingsItemModel = z.object({
  id: z.number(),
  market: z.enum(Market),
  market_link: z.string(),
  mean_price: z.number().nullable(),
  min_price: z.number().nullable(),
  max_price: z.number().nullable(),
  median_price: z.number().nullable(),
  listings: z.number(),
  timestamp: z.coerce.date()
});

export const ListingsLatestAggregatedModel = z.object({
  market_hash_name: z.string(),
  listings: z.array(ListingsItemModel)
});

export const ListingsHistoryAggregatedModel = z.object({
  items: z.array(z.object({
    timestamp: z.coerce.date(),
    listings: z.array(z.object({
      id: z.number(),
      market: z.enum(Market),
      mean_price: z.number().nullable(),
      min_price: z.number().nullable(),
      max_price: z.number().nullable(),
      median_price: z.number().nullable(),
      listings: z.number()
    }))
  }))
});

const SalesItemModel = z.object({
  id: z.number(),
  market: z.enum(Market),
  mean_price: z.number().nullable(),
  min_price: z.number().nullable(),
  max_price: z.number().nullable(),
  median_price: z.number().nullable(),
  volume: z.number().nullable(),
  day: z.coerce.date()
});

export const SalesLatestAggregatedModel = z.object({
  market_hash_name: z.string(),
  sales: z.array(SalesItemModel)
});

export const SalesHistoryAggregatedModel = z.object({
  items: z.array(z.object({
    day: z.string(),
    sales: z.array(z.object({
      id: z.number(),
      market: z.enum(Market),
      mean_price: z.number().nullable(),
      min_price: z.number().nullable(),
      max_price: z.number().nullable(),
      median_price: z.number().nullable(),
      volume: z.number().nullable()
    }))
  }))
});

const ItemModel = z.object({
  market_hash_name: z.string(),
  hash_name: z.string(),
  nameid: z.number().nullable().optional(),
  classid: z.string().nullable().optional(),
  exterior: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
  weapon: z.string().nullable().optional(),
  max_sticker_amount: z.number().nullable().optional(),
  used_by_class: z.string().nullable().optional(),
  quality: z.string().nullable().optional(),
  type: z.string().nullable().optional(),
  sticker_type: z.string().nullable().optional(),
  graffiti_type: z.string().nullable().optional(),
  patch_type: z.string().nullable().optional(),
  collection: z.string().nullable().optional(),
  sticker_collection: z.string().nullable().optional(),
  graffiti_collection: z.string().nullable().optional(),
  patch_collection: z.string().nullable().optional(),
  graffiti_color: z.string().nullable().optional(),
  professional_player: z.string().nullable().optional(),
  tournament: z.string().nullable().optional(),
  team: z.string().nullable().optional(),
  min_float: z.number().nullable().optional(),
  max_float: z.number().nullable().optional(),
  droppool: z.string().nullable().optional(),
  release_dt: z.string().nullable().optional(),
  akamai_icon_url: z.string().nullable().optional(),
  cloudflare_icon_url: z.string().nullable().optional()
});

export const ItemsModel = z.object({
  items: z.array(ItemModel)
});

const CurrencyRateModel = z.object({
  currency_code: z.string(),
  currency_name: z.string(),
  currency_symbol: z.string(),
  rate: z.number(),
  timestamp: z.coerce.date()
});

export const CurrencyRatesModel = z.object({
  items: z.array(CurrencyRateModel)
});

export const PlayerCountsLatestModel = z.object({
  timestamp: z.coerce.date(),
  count: z.number()
});

export const PlayerCountsHistoryModel = z.object({
  items: z.array(z.object({
    timestamp: z.coerce.date(),
    count: z.number()
  }))
});

const MarketInfoModel = z.object({
  market: z.string(),
  url: z.string(),
  description: z.string(),
  type: z.string().nullable(),
  country: z.string(),
  icon: z.string().nullable(),
  trustpilot: z.object({
    rating: z.number(),
    reviews: z.number(),
    link: z.string()
  }),
  fees: z.object({
    deposit: z.number().nullable(),
    buyer: z.union([
      z.number(),
      z.object({ min: z.number(), max: z.number() })
    ]).nullable(),
    seller: z.union([
      z.number(),
      z.object({ min: z.number(), max: z.number() })
    ]).nullable(),
    withdrawal: z.number().nullable()
  }),
  updated_at: z.coerce.date()
});

export const MarketsModel = z.array(MarketInfoModel);


export type ListingsLatestAggregated = z.infer<typeof ListingsLatestAggregatedModel>;
export type ListingsHistoryAggregated = z.infer<typeof ListingsHistoryAggregatedModel>;
export type SalesLatestAggregated = z.infer<typeof SalesLatestAggregatedModel>;
export type SalesHistoryAggregated = z.infer<typeof SalesHistoryAggregatedModel>;
export type Items = z.infer<typeof ItemsModel>;
export type CurrencyRates = z.infer<typeof CurrencyRatesModel>;
export type PlayerCountsLatest = z.infer<typeof PlayerCountsLatestModel>;
export type PlayerCountsHistory = z.infer<typeof PlayerCountsHistoryModel>;
export type MarketInfo = z.infer<typeof MarketInfoModel>;
export type Markets = z.infer<typeof MarketsModel>;


