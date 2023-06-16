import { useState } from "react";
import { ethers } from "ethers";
import Transaction from "./Transaction";

export default function Withdraw({ lotteryContract }) {
  const [txData, setTxData] = useState();
  const [isLoading, setLoading] = useState();
  const [amount, setAmount] = useState(0);

  const handleChange = (event) => {
    setAmount(event.target.value);
  };

  async function withdrawTokens() {
    setLoading(true);
    try {
      const tx = await lotteryContract.ownerWithdraw(
        ethers.utils.parseEther(amount.toString())
      );
      const data = await tx.wait();
      setTxData(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <>
      <h3>Withdraw Tokens</h3>
      <p>Enter amount:</p>
      <input
        type="text"
        id="amount"
        name="amount"
        onChange={handleChange}
        value={amount}
      />
      <button
        onClick={() => {
          withdrawTokens();
        }}
      >
        {isLoading ? `Wait till the transaction to be completed` : `Withdraw`}
      </button>
      {txData && <Transaction transaction={txData} />}
    </>
  );
}
