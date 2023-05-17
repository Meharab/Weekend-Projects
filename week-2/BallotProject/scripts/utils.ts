import * as dotenv from "dotenv";
import { ethers, Signer } from "ethers";
dotenv.config();

export function getSigner(): Signer {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
  // const provider = new ethers.providers.AlchemyProvider("goerli", process.env.ALCHEMY_API_KEY);
  const url = `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
  const provider = new ethers.providers.JsonRpcProvider(url);
  const signer = wallet.connect(provider);

  return signer;
}
