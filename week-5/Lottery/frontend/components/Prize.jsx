import { useState } from "react";
import { ethers } from "ethers";

export default function Prize({ lotteryContract, walletAddress }) {
  const [isLoading, setLoading] = useState();
  const [prize, setPrize] = useState();

  async function getPrize() {
    setLoading(true);
    try {
      const prizeBN = await lotteryContract.prize(walletAddress);
      const prize = ethers.utils.formatEther(prizeBN);
      setPrize(prize);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <>
      <h3>Prize</h3>
      <button
        onClick={() => {
          getPrize();
        }}
      >
        {isLoading ? `Checking...` : `Check`}
      </button>
      {prize === undefined ? null : (
        <>
          <div>
            <h1>{prize}</h1>
          </div>
        </>
      )}
    </>
  );
}
