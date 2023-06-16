import { useSigner, useNetwork } from "wagmi";
import { useState, useEffect } from "react";
import { getLotteryContract, getTokenContract } from "../assets/utils";
import CheckState from "./CheckState";
import OpenBets from "./OpenBets";
import BuyTokens from "./BuyTokens";
import TokenBalance from "./TokenBalance";
import Bet from "./Bet";
import CloseLottery from "./CloseLottery";
import Prize from "./Prize";
import Claim from "./Claim";
import Pool from "./Pool";
import Withdraw from "./Withdraw";
import Burn from "./Burn";

export default function PageBody() {
  const { data: signer } = useSigner();
  const [lotteryContract, setLotteryContract] = useState();
  const [tokenContract, setTokenContract] = useState();
  const [walletAddress, setWalletAddress] = useState();
  const { chain, chains } = useNetwork();

  useEffect(() => {
    if (signer && chain) {
      const lotteryContract = getLotteryContract(signer, chain);
      setLotteryContract(lotteryContract);
      const tokenContract = getTokenContract(signer, chain);
      setTokenContract(tokenContract);
      (async () => {
        const walletAddress = await signer.getAddress();
        setWalletAddress(walletAddress);
      })();
    }
  }, [signer, chain]);

  if (!walletAddress)
    return (
      <p style={{ color: "red", fontWeight: "bold" }}> Please connect wallet</p>
    );
  return (
    <>
      <CheckState lotteryContract={lotteryContract}></CheckState>
      <OpenBets lotteryContract={lotteryContract}></OpenBets>
      <BuyTokens lotteryContract={lotteryContract}></BuyTokens>
      <TokenBalance
        tokenContract={tokenContract}
        walletAddress={walletAddress}
      ></TokenBalance>
      <Bet
        lotteryContract={lotteryContract}
        tokenContract={tokenContract}
      ></Bet>
      <CloseLottery lotteryContract={lotteryContract}></CloseLottery>
      <Prize
        lotteryContract={lotteryContract}
        walletAddress={walletAddress}
      ></Prize>
      <Claim lotteryContract={lotteryContract}></Claim>
      <Pool lotteryContract={lotteryContract}></Pool>
      <Withdraw lotteryContract={lotteryContract}></Withdraw>
      <Burn
        lotteryContract={lotteryContract}
        tokenContract={tokenContract}
      ></Burn>
    </>
  );
}
