import contractJson from "../assets/Lottery.json";
import tokenJson from "../assets/LotteryToken.json";
import { goerli, sepolia, polygonMumbai } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { ethers } from "ethers";

const LOTTERY_CONTRACT_ADDRESS_GOERLI =
  "0x40d3989CF95885f6456aCe44beC69Ac198Eb06F9";
const TOKEN_CONTRACT_ADDRESS_GOERLI =
  "0x2545A4069DE81cd1f20569946B6023998Cf4A7DA";

const LOTTERY_CONTRACT_ADDRESS_MUMBAI =
  "0x092347754F955ff936342ae94b494fa007492100";
const TOKEN_CONTRACT_ADDRESS_MUMBAI =
  "0xb904b0742B542A98C2520863CC3df3783a8DA8b8";

const LOTTERY_CONTRACT_ADDRESS_SEPOLIA =
  "0x76ad2A3d5f439d62a18833D3cA3AB0850Bf57608";
const TOKEN_CONTRACT_ADDRESS_SEPOLIA =
  "0x2073b3BC8b5Fc0aA961687E02CE89c17e9f48053";

export function getLotteryContract(signer, chain) {
  switch (chain.network) {
    case "goerli":
      return new ethers.Contract(
        LOTTERY_CONTRACT_ADDRESS_GOERLI,
        contractJson.abi,
        signer
      );
    case "sepolia":
      return new ethers.Contract(
        LOTTERY_CONTRACT_ADDRESS_SEPOLIA,
        contractJson.abi,
        signer
      );
    case "maticmum":
      return new ethers.Contract(
        LOTTERY_CONTRACT_ADDRESS_MUMBAI,
        contractJson.abi,
        signer
      );
    default:
      throw new Error("Unknown network!");
  }
}

export function getTokenContract(signer, chain) {
  switch (chain.network) {
    case "goerli":
      return new ethers.Contract(
        TOKEN_CONTRACT_ADDRESS_GOERLI,
        tokenJson.abi,
        signer
      );
    case "sepolia":
      return new ethers.Contract(
        TOKEN_CONTRACT_ADDRESS_SEPOLIA,
        tokenJson.abi,
        signer
      );
    case "maticmum":
      return new ethers.Contract(
        TOKEN_CONTRACT_ADDRESS_MUMBAI,
        tokenJson.abi,
        signer
      );
    default:
      throw new Error("Unknown network!");
  }
}

export function getTransactionLink(transaction, chain) {
  switch (chain.network) {
    case "goerli":
      return "https://goerli.etherscan.io/tx/" + transaction.transactionHash;
    case "sepolia":
      return "https://sepolia.etherscan.io/tx/" + transaction.transactionHash;
    case "maticmum":
      return "https://mumbai.polygonscan.com/" + transaction.transactionHash;
    default:
      throw new Error("Unknown network!");
  }
}

export function getSupportedChains() {
  return [goerli, sepolia, polygonMumbai];
}

export function getProvider(apiKey) {
  return jsonRpcProvider({
    rpc: (chain) => {
      let rpcUrl;
      switch (chain.network) {
        case "goerli":
          rpcUrl = `https://eth-goerli.alchemyapi.io/v2/${apiKey}`;
          break;
        case "sepolia":
          rpcUrl = `https://eth-sepolia.g.alchemy.com/v2/${apiKey}`;
          break;
        case "maticmum":
          rpcUrl = `https://polygon-mumbai.g.alchemy.com/v2/${apiKey}`;
          break;
        default:
          throw new Error("Unknown network!");
      }

      return { http: rpcUrl };
    },
  });
}
