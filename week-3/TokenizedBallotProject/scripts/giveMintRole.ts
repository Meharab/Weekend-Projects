import { MyERC20Votes__factory } from "../typechain-types";
import { getSigner } from "./utils";
import { ethers } from "ethers";

async function main() {
  const contractAdderess = process.argv[2];
  const walletAddress = process.argv[3];
  const signer = getSigner();

  const tokenFactory = new MyERC20Votes__factory(signer);
  const tokenContract = tokenFactory.attach(contractAdderess);

  console.log(`Attached to the contract at address ${tokenContract.address}`);

  // Fetching the role code
  const code = await tokenContract.MINTER_ROLE();
  console.log(`Giving MINTER_ROLE to ${walletAddress}`);
  const roleTx = await tokenContract.grantRole(code, walletAddress);
  const roleTxReceipt = await roleTx.wait();

  console.log(
    `The transaction hash is ${roleTxReceipt.transactionHash} included in the block ${roleTxReceipt.blockNumber}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
