import { ethers, Signer } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

export function getSigner(privateKey = process.env.PRIVATE_KEY): Signer {
  const wallet = new ethers.Wallet(privateKey ?? "");
  // const provider = new ethers.providers.AlchemyProvider("goerli", process.env.ALCHEMY_API_KEY);
  const url = `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
  const provider = new ethers.providers.JsonRpcProvider(url);
  const signer = wallet.connect(provider);

  return signer;
}
