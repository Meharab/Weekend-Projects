import { useState } from "react";
import { ethers } from "ethers";

export default function Pool({ lotteryContract }) {
  const [isLoading, setLoading] = useState();
  const [pool, setPool] = useState();

  async function ownerPool() {
    setLoading(true);
    try {
      const balanceBN = await lotteryContract.ownerPool();
      const balance = ethers.utils.formatEther(balanceBN);
      setPool(balance);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <>
      <h3>Owner Pool</h3>
      <button
        onClick={() => {
          ownerPool();
        }}
      >
        {isLoading ? `Checking...` : `Check`}
      </button>
      {pool === undefined ? null : (
        <>
          <div>
            <h1>{pool}</h1>
          </div>
        </>
      )}
    </>
  );
}
