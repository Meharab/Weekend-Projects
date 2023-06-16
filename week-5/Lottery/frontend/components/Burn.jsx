import { useState } from "react";
import { ethers } from "ethers";
import Transaction from "./Transaction";

export default function Burn({ lotteryContract, tokenContract }) {
  const [txData, setTxData] = useState();
  const [tx, setTx] = useState();
  const [isLoading, setLoading] = useState();
  const [amount, setAmount] = useState(0);

  const handleChange = (event) => {
    setAmount(event.target.value);
  };

  async function burnTokens() {
    setLoading(true);
    try {
      const allowTx = await tokenContract.approve(
        lotteryContract.address,
        ethers.utils.parseEther(amount.toString())
      );
      const allow = await allowTx.wait();
      setTx(allow);
      const tx = await lotteryContract.returnTokens(
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
      <h3>Burn Tokens</h3>
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
          burnTokens();
        }}
      >
        {isLoading ? `Wait till the transaction to be completed` : `Burn`}
      </button>
      {tx && <Transaction transaction={tx} />}
      {txData && <Transaction transaction={txData} />}
    </>
  );
}
