import { ethers } from "ethers";
import { Ballot__factory } from "../typechain-types";
import { getSigner } from "./utils";

async function main() {
  const contractAdderess = process.argv[2];
  const signer = getSigner();

  const ballotFactory = new Ballot__factory(signer);
  const ballotContract = ballotFactory.attach(contractAdderess);
  console.log(`Attached to the contract at address ${ballotContract.address}`);

  const proposals = (await ballotContract.listProposal()).map((element) =>  ethers.utils.parseBytes32String(element));
    console.log("The Proposals: ");
    proposals.forEach((element, index) => {
        console.log(`Proposal No. ${index + 1}: ${element}`);
    });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
