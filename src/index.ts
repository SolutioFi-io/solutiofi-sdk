import axios, { AxiosInstance } from "axios";

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
      baseURL: options.baseUrl || "https://api.synthesis.solutiofi.io",
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && error.response.status === 401) {
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
    console.log("22");
    const response = await this.client.post(
      "/auth/token",
      {},
      {
        headers: {
          "x-api-key": this.apiKey,
        },
      }
    );
    console.log(response);
    this.bearerToken = response.data.token;
    this.client.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${this.bearerToken}`;
  }

  async getTokenPrices(mints: string[]): Promise<any> {
    const response = await this.client.post("/v1/tokens/prices", { mints });
    return response.data;
  }

  async createCloseTransaction(
    owner: string,
    accounts: string[]
  ): Promise<any> {
    const response = await this.client.post("/v1/close/create", {
      owner,
      accounts,
    });
    return response.data;
  }

  async createBurnTransaction(owner: string, assets: string[]): Promise<any> {
    const response = await this.client.post("/v1/burn/create", {
      owner,
      assets,
    });
    return response.data;
  }

  async createSwapTransaction(
    owner: string,
    inputAssets: any[],
    outputMint: string,
    priorityFee: string
  ): Promise<any> {
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
  ): Promise<any> {
    const response = await this.client.post("/v1/swap/spread", {
      owner,
      inputAsset,
      targetTokens,
      priorityFee,
    });
    return response.data;
  }

  async getUserTokens(owner: string, type: string): Promise<any> {
    const response = await this.client.post("/v1/usertokens", { owner, type });
    return response.data;
  }
}

export default SolutioFi;
