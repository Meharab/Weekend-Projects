import { ethers } from "ethers";
import { TokenizedBallot__factory } from "../typechain-types";
import { getSigner } from "./utils";

async function main() {
  const tokenContractAdderess = process.argv[2];
  const proposals = process.argv.slice(3);

  console.log("Deploying TokenizedBallot contract");
  console.log("Proposals: ");
  proposals.forEach((element, index) => {
    console.log(`Proposal No. ${index + 1}: ${element}`);
  });

  const signer = getSigner();

  const BLOCKS_QUANTITY = 15000; // about 2 days
  const ballotFactory = new TokenizedBallot__factory(signer);
  const ballotContract = await ballotFactory.deploy(
    proposals.map(ethers.utils.formatBytes32String),
    tokenContractAdderess,
    BLOCKS_QUANTITY
  );
  const deployTx = await ballotContract.deployTransaction.wait();
  console.log(
    `The ballot contract was deployed at ${ballotContract.address} at block ${deployTx.blockNumber}`
  );
  const targetBlockNumber = await ballotContract.targetBlockNumber();
  console.log(`Voting will end at block ${targetBlockNumber}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
