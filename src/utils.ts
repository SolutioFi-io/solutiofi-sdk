import { VersionedTransaction } from "@solana/web3.js";

export function deserialize(serializedTxns): VersionedTransaction[] {
    const deserialized: VersionedTransaction[] = [];

    for (const txn of serializedTxns) {
        const buffer = Uint8Array.from(Buffer.from(txn, 'base64'));

        deserialized.push(VersionedTransaction.deserialize(buffer));
      }

    return deserialized
}