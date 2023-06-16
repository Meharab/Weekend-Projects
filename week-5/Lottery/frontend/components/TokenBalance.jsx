import { useState } from "react";
import { ethers } from "ethers";

export default function TokenBalance({ tokenContract, walletAddress }) {
  const [isLoading, setLoading] = useState();
  const [balance, setBalance] = useState();

  async function getTokenBalance() {
    setLoading(true);
    try {
      const balanceBN = await tokenContract.balanceOf(walletAddress);
      const balance = ethers.utils.formatEther(balanceBN);
      setBalance(balance);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <>
      <h3>Token Balance</h3>
      <button
        onClick={() => {
          getTokenBalance();
        }}
      >
        {isLoading ? `Checking...` : `Check`}
      </button>
      {balance === undefined ? null : (
        <>
          <div>
            <h1>{balance}</h1>
          </div>
        </>
      )}
    </>
  );
}
