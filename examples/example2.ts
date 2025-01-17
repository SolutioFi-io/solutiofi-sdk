import SolutioFi from "../src/index";

const api = new SolutioFi({
  apiKey: "solutiof-api-key",
});

async function main() {
  await api.authenticate();

  try {
    const tokenPrices = await api.getTokenPrices([
      "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    ]);
    console.log("Token Prices:", tokenPrices);
  } catch (error) {
    console.error("Error:", error);
  }
}

main().catch(console.error);
