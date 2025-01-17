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
