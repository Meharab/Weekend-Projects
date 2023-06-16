import { useState } from "react";
import Transaction from "./Transaction";

export default function OpenBets({ lotteryContract }) {
  const [txData, setTxData] = useState();
  const [isLoading, setLoading] = useState();
  const [duration, setDuration] = useState();

  const handleChange = (event) => {
    setDuration(event.target.value);
  };

  async function setOpenBets() {
    setLoading(true);
    try {
      const provider = lotteryContract.provider;
      const currentBlock = await provider.getBlock("latest");
      const tx = await lotteryContract.openBets(
        currentBlock.timestamp + Number(duration)
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
      <h3>Open Bets</h3>
      <p>Enter duration:</p>
      <input
        type="text"
        id="duration"
        name="duration"
        onChange={handleChange}
        value={duration}
      />
      <button
        onClick={() => {
          setOpenBets();
        }}
      >
        {isLoading ? `Wait till the transaction to be completed` : `Open`}
      </button>
      {txData && <Transaction transaction={txData} />}
    </>
  );
}
