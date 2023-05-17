import { ethers } from "ethers";
import { TokenizedBallot__factory } from "../typechain-types";
import { getSigner } from "./utils";

async function main() {
  const contractAdderess = process.argv[2];
  const signer = getSigner();

  const ballotFactory = new TokenizedBallot__factory(signer);
  const ballotContract = ballotFactory.attach(contractAdderess);
  console.log(`Attached to the contract at address ${ballotContract.address}`);

  const winnerName = ethers.utils.parseBytes32String(
    await ballotContract.winnerName()
  );
  console.log(`The winner name: ${winnerName}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
