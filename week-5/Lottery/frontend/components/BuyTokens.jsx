import { useState } from "react";
import { ethers } from "ethers";
import Transaction from "./Transaction";

export default function BuyTokens({ lotteryContract }) {
  const TOKEN_RATIO = 1;

  const [txData, setTxData] = useState();
  const [isLoading, setLoading] = useState();
  const [amount, setAmount] = useState(0);

  const handleChange = (event) => {
    setAmount(event.target.value);
  };

  async function _buyTokens() {
    setLoading(true);
    try {
      const tx = await lotteryContract.purchaseTokens({
        value: ethers.utils.parseEther(amount.toString()).div(TOKEN_RATIO),
      });
      const data = await tx.wait();
      setTxData(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <>
      <h3>Buy Tokens</h3>
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
          _buyTokens();
        }}
      >
        {isLoading ? `Wait till the transaction to be completed` : `Buy`}
      </button>
      {txData && <Transaction transaction={txData} />}
    </>
  );
}
