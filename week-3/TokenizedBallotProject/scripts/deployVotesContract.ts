import { ethers } from "ethers";
import { MyERC20Votes__factory } from "../typechain-types";
import { getSigner } from "./utils";

async function main() {
  const signer = getSigner();

  const contractFactory = new MyERC20Votes__factory(signer);
  const contract = await contractFactory.deploy();
  const contractDeployTxReceipt = await contract.deployTransaction.wait();
  console.log(
    `The contract was deployed at address ${contract.address} at block ${contractDeployTxReceipt.blockNumber}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
