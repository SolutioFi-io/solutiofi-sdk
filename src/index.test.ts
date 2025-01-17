import SolutioFi from "../src/index";
import { expect } from "chai";
import "mocha";

describe("SolutioFi", () => {
  let api: SolutioFi;

  before(async () => {
    api = new SolutioFi({ apiKey: "your-api-key" });
    await api.authenticate();
  });

  it("should get token prices", async () => {
    const prices = await api.getTokenPrices([
      "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    ]);
    expect(prices).to.be.an("array");
  });
});
