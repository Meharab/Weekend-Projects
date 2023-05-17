import { Ballot__factory } from "../typechain-types";
import { getSigner } from "./utils";
import { ethers } from "ethers";

async function main() {
  const contractAdderess = process.argv[2];
  let voteTo = Number(process.argv[3]);
  const signer = getSigner();
  
  const ballotFactory = new Ballot__factory(signer);
  const ballotContract = ballotFactory.attach(contractAdderess);
  const proposals = (await ballotContract.listProposal()).map((element) =>  ethers.utils.parseBytes32String(element));

  if (voteTo > proposals.length || voteTo < 1) {
    throw new Error("Invalid vote");
  }
  //correct index from 0 to 1
  voteTo = voteTo - 1;

  console.log(`Attached to the contract at address ${ballotContract.address}`);

  console.log(`Casting vote to No.${voteTo+1} - ${proposals[voteTo]}`);
  const vote = await ballotContract.vote(voteTo);
  const voteTxReceipt = await vote.wait();

  console.log(
    `The transaction hash is ${voteTxReceipt.transactionHash} included in the block ${voteTxReceipt.blockNumber}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});