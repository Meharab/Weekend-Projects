import { useNetwork } from "wagmi";
import { getTransactionLink } from "../assets/utils";

export default function Transaction({ transaction }) {
  const { chain, chains } = useNetwork();
  return (
    <div>
      <p>Transaction completed!</p>
      <a href={getTransactionLink(transaction, chain)} target="_blank">
        {transaction.transactionHash}
      </a>
    </div>
  );
}
