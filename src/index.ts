import axios, { AxiosInstance } from "axios";
import {
  BurnTransactionResponse,
  CloseTransactionResponse,
  MergeResponse,
  PriceResponse,
  SpreadResponse,
  TokenResponse,
} from "./types";

interface SolutioFiSdkOptions {
  apiKey: string;
  baseUrl?: string;
}

class SolutioFi {
  private client: AxiosInstance;
  private apiKey: string;
  private bearerToken: string | null = null;

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

  async createCloseTransaction(
    owner: string,
    mints: string[]
  ): Promise<CloseTransactionResponse> {
    const response = await this.client.post("/v1/close/create", {
      owner,
      mints,
    });
    return response.data;
  }

  async createBurnTransaction(
    owner: string,
    mints: string[]
  ): Promise<BurnTransactionResponse> {
    const response = await this.client.post("/v1/burn/create", {
      owner,
      mints,
    });
    return response.data;
  }

  async createMergeTransaction(
    owner: string,
    inputAssets: any[],
    outputMint: string,
    priorityFee: string
  ): Promise<MergeResponse> {
    const response = await this.client.post("/v1/swap/merge", {
      owner,
      inputAssets,
      outputMint,
      priorityFee,
    });
    return response.data;
  }

  async createSpreadTransaction(
    owner: string,
    inputAsset: any,
    targetTokens: any[],
    priorityFee: string
  ): Promise<SpreadResponse> {
    const response = await this.client.post("/v1/swap/spread", {
      owner,
      inputAsset,
      targetTokens,
      priorityFee,
    });
    return response.data;
  }

  async getTokenPrices(mints: string[]): Promise<PriceResponse> {
    const response = await this.client.post("/v1/tokens/prices", { mints });
    return response.data;
  }

  async getUserTokens(owner: string, type: string): Promise<TokenResponse> {
    const response = await this.client.post("/v1/usertokens", { owner, type });
    return response.data;
  }
}

export default SolutioFi;
