import { Ballot__factory } from "../typechain-types";
import { getSigner } from "./utils";

async function main() {
  const contractAdderess = process.argv[2];
  const voterAdderess = process.argv[3];
  const signer = getSigner();

  const ballotFactory = new Ballot__factory(signer);
  const ballotContract = ballotFactory.attach(contractAdderess);
  console.log(`Attached to the contract at address ${ballotContract.address}`);

  console.log(`Delegating to ${voterAdderess}`);
  const delegate = await ballotContract.delegate(voterAdderess);
  const delegateTxReceipt = await delegate.wait();

  console.log(
    `The transaction hash is ${delegateTxReceipt.transactionHash} included in the block ${delegateTxReceipt.blockNumber}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});