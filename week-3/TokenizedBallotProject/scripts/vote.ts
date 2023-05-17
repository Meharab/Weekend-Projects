import { TokenizedBallot__factory } from "../typechain-types";
import { getSigner } from "./utils";
import { ethers } from "ethers";

async function main() {
  const contractAdderess = process.argv[2];
  let proposalNumber = Number(process.argv[3]);
  const amount = ethers.utils.parseUnits(process.argv[4]);
  const signer = getSigner();

  const ballotFactory = new TokenizedBallot__factory(signer);
  const ballotContract = ballotFactory.attach(contractAdderess);
  const proposals = (await ballotContract.listProposal()).map((element) =>
    ethers.utils.parseBytes32String(element)
  );

  if (proposalNumber >= proposals.length || proposalNumber < 0) {
    throw new Error("Invalid vote");
  }

  console.log(`Attached to the contract at address ${ballotContract.address}`);

  console.log(
    `Casting vote to proposal "${
      proposals[proposalNumber]
    }"`
  );
  const vote = await ballotContract.vote(proposalNumber, amount);
  const voteTxReceipt = await vote.wait();

  console.log(
    `The transaction hash is ${voteTxReceipt.transactionHash} included in the block ${voteTxReceipt.blockNumber}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
