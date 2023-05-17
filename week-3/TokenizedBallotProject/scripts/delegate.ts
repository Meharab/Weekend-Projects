import { ethers } from "ethers";
import { MyERC20Votes__factory } from "../typechain-types";
import { getSigner } from "./utils";

async function main() {
  const tokenContractAdderess = process.argv[2];
  const voterAddress = process.argv[3];

  const signer = getSigner();

  const contractFactory = new MyERC20Votes__factory(signer);
  const contract = await contractFactory.attach(tokenContractAdderess);
  console.log(`Attached to the contract at address ${contract.address}`);

  console.log(`Delegating to ${voterAddress}`);
  const delegate = await contract.delegate(voterAddress);
  const delegateTxReceipt = await delegate.wait();
  console.log(
    `The transaction hash is ${delegateTxReceipt.transactionHash} included in the block ${delegateTxReceipt.blockNumber}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
