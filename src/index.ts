import axios, { AxiosInstance } from "axios";
import { VersionedTransaction } from "@solana/web3.js";
import { deserialize } from "./utils";
import {
  AssetType,
  InputAssetStruct,
  MergeResponse,
  PriceResponse,
  PriorityFee,
  ProcessAssetData,
  SolutioFiSdkOptions,
  SpreadResponse,
  TargetTokenStruct,
  TokenResponse,
} from "./types";

/**
 * A client for interacting with the SolutioFi API.
 */
class SolutioFi {
  private client: AxiosInstance;
  private apiKey: string;
  private bearerToken: string | null = null;

  /**
   * Initializes the SolutioFi client.
   * @param options - The options for initializing the SDK.
   */
  constructor(options: SolutioFiSdkOptions) {
    this.apiKey = options.apiKey;
    this.client = axios.create({
      baseURL: options.baseUrl || "https://api.solutiofi.io",
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          await this.authenticate();
          const config = error.config;
          config.headers["Authorization"] = `Bearer ${this.bearerToken}`;
          return this.client.request(config);
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Authenticates the client using the API key and retrieves a bearer token.
   */
  async authenticate(): Promise<void> {
    const response = await this.client.get("/auth/token", {
      headers: {
        "x-api-key": this.apiKey,
      },
    });
    this.bearerToken = response.data.token;
    this.client.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${this.bearerToken}`;
  }

  /**
   * Creates a transaction to close accounts.
   * @param owner - The wallet address of the account owner.
   * @param mints - Array of mint addresses for the accounts to close.
   * @returns An array of versioned transactions.
   */
  async close(
    owner: string,
    mints: string[]
  ): Promise<VersionedTransaction[]> {
    const response = await this.client.post("/v1/close/create", {
      owner,
      mints,
    });

    if (response.data.error) {
      throw new Error(`SolutfioFi API error: ${response.data.error}`);
    }

    return deserialize(response.data.transactions);
  }

  /**
   * Create burn transactions.
   * @param owner - The wallet address of the account owner.
   * @param mints - Array of mint addresses for the assets to burn.
   * @returns An array of versioned transactions.
   */
  async burn(owner: string, mints: string[]): Promise<VersionedTransaction[]> {
    const response = await this.client.post("/v1/burn/create", {
      owner,
      mints,
    });

    if (response.data.error) {
      throw new Error(`SolutfioFi API error: ${response.data.error}`);
    }

    return deserialize(response.data.transactions);
  }

  /**
   * Creates a transaction to merge multiple assets into a single output token.
   * @param owner - The wallet address of the account owner.
   * @param inputAssets - Array of input asset structures to merge.
   * @param outputMint - The mint address of the output token.
   * @param priorityFee - The priority fee for the transaction ("fast", "turbo", or "ultra").
   * @returns The response containing transaction details.
   */
  async merge(
    owner: string,
    inputAssets: InputAssetStruct[],
    outputMint: string,
    priorityFee: PriorityFee
  ): Promise<MergeResponse> {
    const response = await this.client.post("/v1/swap/merge", {
      owner,
      inputAssets,
      outputMint,
      priorityFee,
    });

    if (response.data.transactions) {
      response.data.transactions = response.data.transactions.map(
        (tx: ProcessAssetData) => ({
          ...tx,
          transaction: deserialize([tx.transaction])[0],
        })
      );
    }

    return response.data;
  }

  /**
   * Creates a transaction to spread an input asset across multiple target tokens.
   * @param owner - The wallet address of the account owner.
   * @param inputAsset - The input asset structure for the spread.
   * @param targetTokens - Array of target token structures with their allocations.
   * @param priorityFee - The priority fee for the transaction ("fast", "turbo", or "ultra").
   * @returns The response containing transaction details.
   */
  async spread(
    owner: string,
    inputAsset: InputAssetStruct,
    targetTokens: TargetTokenStruct[],
    priorityFee: PriorityFee
  ): Promise<SpreadResponse> {
    const response = await this.client.post("/v1/swap/spread", {
      owner,
      inputAsset,
      targetTokens,
      priorityFee,
    });

    if (response.data.transactions) {
      response.data.transactions = response.data.transactions.map(
        (tx: ProcessAssetData) => ({
          ...tx,
          transaction: deserialize([tx.transaction])[0],
        })
      );
    }

    return response.data;
  }

  /**
   * Retrieves the prices of specific tokens.
   * @param mints - Array of mint addresses.
   * @returns The response containing token price details.
   */
  async getTokenPrices(mints: string[]): Promise<PriceResponse> {
    const response = await this.client.post("/v1/tokens/prices", { mints });
    return response.data;
  }

  /**
   * Retrieves the tokens associated with a user.
   * @param owner - The wallet address of the user.
   * @param type - The type of tokens to retrieve ("assets", "accounts", or "nfts").
   * @returns The response containing user token details.
   */
  async getUserTokens(owner: string, type: AssetType): Promise<TokenResponse> {
    const response = await this.client.post("/v1/usertokens", { owner, type });
    return response.data;
  }
}

export default SolutioFi;
