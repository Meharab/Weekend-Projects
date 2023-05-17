import { ethers } from "ethers";
import { Ballot__factory } from "../typechain-types";
import { getSigner } from "./utils";

async function main() {
  const proposals = process.argv.slice(2);

  console.log("Deploying Ballot contract");
  console.log("Proposals: ");
  proposals.forEach((element, index) => {
    console.log(`Proposal No. ${index + 1}: ${element}`);
  });

  const signer = getSigner();

  const ballotFactory = new Ballot__factory(signer);
  const ballotContract = await ballotFactory.deploy(
    proposals.map(ethers.utils.formatBytes32String)
  );
  const deployTx = await ballotContract.deployTransaction.wait();
  console.log(
    `The ballot contract was deployed at ${ballotContract.address} at block ${deployTx.blockNumber}`
  );
  const chairperson = await ballotContract.chairperson();
  console.log(`The Chairperson for this contract is ${chairperson}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
