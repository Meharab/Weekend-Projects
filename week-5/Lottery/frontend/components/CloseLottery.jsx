import { useState } from "react";
import Transaction from "./Transaction";

export default function CloseLottery({ lotteryContract }) {
  const [txData, setTxData] = useState();
  const [isLoading, setLoading] = useState();

  async function setCloseLottery() {
    setLoading(true);
    try {
      const tx = await lotteryContract.closeLottery();
      const data = await tx.wait();
      setTxData(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <>
      <h3>Close Lottery</h3>
      <button
        onClick={() => {
          setCloseLottery();
        }}
      >
        {isLoading ? `Wait till the transaction to be completed` : `Close`}
      </button>
      {txData && <Transaction transaction={txData} />}
    </>
  );
}
