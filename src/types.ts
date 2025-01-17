import type { QuoteResponse } from "@jup-ag/api";

export interface TokenPrice {
  mint: string;
  price: number;
}

export interface CloseTransaction {
  owner: string;
  accounts: string[];
}

export interface BurnTransaction {
  owner: string;
  assets: string[];
}

export interface SwapTransaction {
  owner: string;
  inputAssets: any[];
  outputMint: string;
  priorityFee: string;
}

export interface SpreadTransaction {
  owner: string;
  inputAsset: any;
  targetTokens: any[];
  priorityFee: string;
}

export interface UserTokens {
  owner: string;
  type: string;
}

export interface CloseTransactionResponse {
  transactions: string[];
  error: string | null;
}

export interface BurnTransactionResponse {
  transactions: string[];
  error: string | null;
}

export interface PriceInfo {
  id: string;
  type: string;
  price: number;
}

export interface PriceResponse {
  prices: PriceInfo[];
  error: string | null;
}

export interface TokenInfo {
  program: string;
  account: string;
  hasTransferFee: boolean;
  mint: string;
  name: string;
  symbol: string;
  amount: number;
  decimals: number;
  imageUrl: string;
  cost: number;
}

export interface TokenResponse {
  data: TokenInfo[];
  error: string | null;
}

export interface SwapAssetData {
  mint: string;
  inputAmount: string;
  decimals: number;
  slippage: string;
  asLegacyTransaction: boolean;
  onlyDirectRoutes: boolean;
}

export interface ProcessAssetData {
  asset: SwapAssetData;
  quote: QuoteResponse;
  transaction: string;
  lastValidBlockHeight: number;
}

export interface MergeResponse {
  transactions: ProcessAssetData[];
  failed: SwapAssetData[];
  error: string | null;
}

export interface SpreadResponse {
  transactions: ProcessAssetData[];
  failed: SwapAssetData[];
  error: string | null;
}
