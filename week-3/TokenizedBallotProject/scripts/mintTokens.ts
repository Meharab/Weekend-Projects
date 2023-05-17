import { ethers } from "ethers";
import { MyERC20Votes__factory } from "../typechain-types";
import { getSigner } from "./utils";

async function main() {
  const tokenContractAdderess = process.argv[2];
  const voterAddress = process.argv[3];
  const mintAmount = ethers.utils.parseUnits(process.argv[4]);

  const signer = getSigner();

  const contractFactory = new MyERC20Votes__factory(signer);
  const contract = await contractFactory.attach(tokenContractAdderess);
  console.log(`Attached to the contract at address ${contract.address}`);

  console.log(
    `Minting ${ethers.utils.formatUnits(
      mintAmount
    )} tokens to the address ${voterAddress}`
  );
  const mintTx = await contract.mint(voterAddress, mintAmount);
  const mintTxReceipt = await mintTx.wait();
  console.log(
    `The transaction hash is ${mintTxReceipt.transactionHash} included in the block ${mintTxReceipt.blockNumber}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
