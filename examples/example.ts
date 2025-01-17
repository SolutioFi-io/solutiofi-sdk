import SolutioFi from "../src/index";

const api = new SolutioFi({
  apiKey: "solutiofi-api-key",
});

async function main() {
  await api.authenticate();
  try {
    const tokenPrices = await api.getTokenPrices(["mint1", "mint2"]);
    console.log("Token Prices:", tokenPrices);

    const closeTransaction = await api.createCloseTransaction(
      "ownerPublicKey",
      ["account1", "account2"]
    );
    console.log("Close Transaction:", closeTransaction);
  } catch (error) {
    console.error("Error:", error);
  }
}

main().catch(console.error);
