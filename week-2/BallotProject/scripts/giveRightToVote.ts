import { Ballot__factory } from "../typechain-types";
import { getSigner } from "./utils";

async function main() {
  const contractAdderess = process.argv[2];
  const voterAdderess = process.argv[3];
  const signer = getSigner();

  const ballotFactory = new Ballot__factory(signer);
  const ballotContract = ballotFactory.attach(contractAdderess);
  console.log(`Attached to the contract at address ${ballotContract.address}`);

  console.log(`Giving voting rights to ${voterAdderess}`);
  const giveRightToVote = await ballotContract.giveRightToVote(voterAdderess);
  const giveRightToVoteTxReceipt = await giveRightToVote.wait();

  console.log(
    `The transaction hash is ${giveRightToVoteTxReceipt.transactionHash} included in the block ${giveRightToVoteTxReceipt.blockNumber}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
