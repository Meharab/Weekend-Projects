import { ethers } from "hardhat";
import { Ballot__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

const LOCAL = true;

const ADDRESS = process.argv[2];
// const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];
const PROPOSALS = process.argv.slice(3);

async function main() {
  let signer;
  if (LOCAL) {
    signer = (await ethers.getSigners())[0];
  } else {
    // const wallet = ethers.Wallet.createRandom();
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
    // const provider = new ethers.providers.AlchemyProvider("goerli", process.env.ALCHEMY_API_KEY);
    const url = `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
    const provider = new ethers.providers.JsonRpcProvider(url);
    const lastBlock = await provider.getBlock("latest");
    console.log(`The last block is ${lastBlock.number}`);
    signer = wallet.connect(provider);
  }

  const balance = await signer.getBalance();
  console.log(`Balance of ${signer.address} is ${balance} WEI`);

  console.log("Deploying Ballot contract");
  console.log("Proposals: ");
  PROPOSALS.forEach((element, index) => {
    console.log(`Proposal N. ${index + 1}: ${element}`);
  });
  // const ballotFactory = await ethers.getContractFactory("Ballot");
  const ballotFactory = new Ballot__factory(signer);
  const ballotContract = await ballotFactory.deploy(
    PROPOSALS.map(ethers.utils.formatBytes32String)
  );
  const deployTx = await ballotContract.deployTransaction.wait();
  console.log(
    `The ballot contract was deployed at ${ballotContract.address} at block ${deployTx.blockNumber}`
  );
  const chairperson = await ballotContract.chairperson();
  console.log(`The Chairperson for this contract is ${chairperson}`);
  console.log(`Giving right to vote to address ${ADDRESS}`);
  const giveRightToVote = await ballotContract.giveRightToVote(ADDRESS);
  const giveRightToVoteTxReceipt = await giveRightToVote.wait();
  console.log(
    `The transaction hash is ${giveRightToVoteTxReceipt.transactionHash} included in the block ${giveRightToVoteTxReceipt.blockNumber}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
