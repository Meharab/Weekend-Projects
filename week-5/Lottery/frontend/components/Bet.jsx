import { useState } from "react";
import Transaction from "./Transaction";

export default function Bet({ lotteryContract, tokenContract }) {
  const [txData, setTxData] = useState();
  const [tx, setTx] = useState();
  const [isLoading, setLoading] = useState();
  const [amount, setAmount] = useState(0);

  const handleChange = (event) => {
    setAmount(event.target.value);
  };

  async function setBet() {
    setLoading(true);
    try {
      const betPrice = await lotteryContract.betPrice();
      const betFee = await lotteryContract.betFee();
      const approveValue = betPrice.add(betFee).mul(amount);
      console.log(approveValue);
      const allowTx = await tokenContract.approve(
        lotteryContract.address,
        approveValue
      );
      const allow = await allowTx.wait();
      setTx(allow);
      const tx = await lotteryContract.betMany(amount);
      const data = await tx.wait();
      setTxData(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <>
      <h3>Bet</h3>
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
          setBet();
        }}
      >
        {isLoading ? `Wait till the transaction to be completed` : `Bet`}
      </button>
      {tx && <Transaction transaction={tx} />}
      {txData && <Transaction transaction={txData} />}
    </>
  );
}
