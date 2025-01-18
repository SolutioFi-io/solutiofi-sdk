import type { QuoteResponse } from "@jup-ag/api";
import { VersionedTransaction } from "@solana/web3.js";

/**
 * Options for initializing the SolutioFi SDK.
 */
export interface SolutioFiSdkOptions {
  /** The API key to authenticate requests. */
  apiKey: string;
  /** Base URL for the API. Defaults to "https://api.solutiofi.io". */
  baseUrl?: string;
}

/** Represents information about a token's price. */
export interface PriceInfo {
  /** The unique identifier of the price entry. */
  id: string;
  /** The type of price entry (e.g., "token"). */
  type: string;
  /** The price of the token. */
  price: number;
}

/** Response for retrieving token prices. */
export interface PriceResponse {
  /** Array of token price information. */
  prices: PriceInfo[];
  /** Error message, if any. */
  error: string | null;
}

/** Detailed information about a token. */
export interface TokenInfo {
  /** The program associated with the token. */
  program: string;
  /** The account address holding the token. */
  account: string;
  /** Indicates whether the token has a transfer fee. */
  hasTransferFee: boolean;
  /** The mint address of the token. */
  mint: string;
  /** The name of the token. */
  name: string;
  /** The symbol of the token. */
  symbol: string;
  /** The amount of tokens held. */
  amount: number;
  /** The number of decimals for the token. */
  decimals: number;
  /** The URL of the token's image. */
  imageUrl: string;
  /** The cost of the token in USD. */
  cost: number;
}

/** Response for retrieving user tokens. */
export interface TokenResponse {
  /** Array of token information. */
  data: TokenInfo[];
  /** Error message, if any. */
  error: string | null;
}

/** Represents data for swapping an asset. */
export interface SwapAssetData {
  /** The mint address of the asset. */
  mint: string;
  /** The input amount for the swap. */
  inputAmount: string;
  /** The number of decimals for the asset. */
  decimals: number;
  /** The slippage tolerance for the swap. */
  slippage: string;
  /** Whether to use legacy transactions. */
  asLegacyTransaction: boolean;
  /** Whether to allow only direct routes for the swap. */
  onlyDirectRoutes: boolean;
}

/** Represents processed asset data. */
export interface ProcessAssetData {
  /** The asset being processed. */
  asset: SwapAssetData;
  /** The quote details for the asset. */
  quote: QuoteResponse;
  /** Versioned transaction. */
  transaction: VersionedTransaction;
  /** The block height when the transaction becomes invalid. */
  lastValidBlockHeight: number;
}

/** Response for a merge transaction. */
export interface MergeResponse {
  /** Array of processed transactions. */
  transactions: ProcessAssetData[];
  /** Array of failed swap assets. */
  failed: SwapAssetData[];
  /** Error message, if any. */
  error: string | null;
}

/** Response for a spread transaction. */
export interface SpreadResponse {
  /** Array of processed transactions. */
  transactions: ProcessAssetData[];
  /** Array of failed swap assets. */
  failed: SwapAssetData[];
  /** Error message, if any. */
  error: string | null;
}

/** Represents input asset data for transactions. */
export interface InputAssetStruct {
  /** The mint address of the asset. */
  mint: string;
  /** The input amount for the transaction. */
  inputAmount: string;
  /** The slippage tolerance for the transaction. */
  slippage: string;
  /** Whether to allow only direct routes for swap. */
  onlyDirectRoutes: boolean;
}

/** Represents target token data for transactions. */
export interface TargetTokenStruct {
  /** The mint address of the token. */
  mint: string;
  /** The percentage allocation for the token (1-100%). */
  percentage: number;
}

export type PriorityFee = "fast" | "turbo" | "ultra";

export type AssetType = "assets" | "accounts" | "nfts";
