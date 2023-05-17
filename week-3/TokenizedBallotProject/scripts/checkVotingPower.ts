import { ethers } from "ethers";
import { TokenizedBallot__factory } from "../typechain-types";
import { getSigner } from "./utils";

async function main() {
  const contractAdderess = process.argv[2];
  const voterAdderess = process.argv[3];
  const signer = getSigner();

  const ballotFactory = new TokenizedBallot__factory(signer);
  const ballotContract = ballotFactory.attach(contractAdderess);
  console.log(`Attached to the contract at address ${ballotContract.address}`);

  const votingPower = ethers.utils.formatUnits((await ballotContract.votingPower(voterAdderess)).toString());
  console.log(`The voter ${voterAdderess} has ${votingPower} voting power`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});