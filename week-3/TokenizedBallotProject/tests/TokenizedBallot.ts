import { expect } from "chai";
import { ethers } from "hardhat";
import { MyERC20Votes, TokenizedBallot } from "../typechain-types";

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

describe("Ballot", () => {
  let ERC20Contract: MyERC20Votes;
  let ballotContract: TokenizedBallot;
  let blockQuantitiy: number = 1;

  const MINT_AMOUNT = ethers.utils.parseUnits("10");

  beforeEach(async () => {
    const ERC20Factory = await ethers.getContractFactory("MyERC20Votes");
    ERC20Contract = await ERC20Factory.deploy();
    await ERC20Contract.deployed();
    const ballotFactory = await ethers.getContractFactory("TokenizedBallot");
    ballotContract = await ballotFactory.deploy(convertStringArrayToBytes32(PROPOSALS), ERC20Contract.address, blockQuantitiy);
    await ballotContract.deployed();
  });

  describe("giveing voting tokens", () => {
    it("minting tokens for voting",async () => {
      const [deployer, acc1, acc2] = await ethers.getSigners();
      const mintTx = await ERC20Contract.mint(acc1.address, MINT_AMOUNT);
      await mintTx.wait();
      expect(ERC20Contract.balanceOf(acc1.address)).to.eq(10.0);
    });
  });

  describe("delegating voting power", () => {
    it("self delegation", async () => {
      const [deployer, acc1, acc2] = await ethers.getSigners();
      const delegeteTx = await ERC20Contract.connect(acc1).delegate(acc1.address);
      await delegeteTx.wait();
      const votePower = await ERC20Contract.getVotes(acc1.address);
      expect(votePower).to.eq(10.0);
    });
  });

  describe("casting votes", () => {
    it("10 voting to Proposal 1", async () => {
      const [deployer, acc1, acc2] = await ethers.getSigners();
      const castingVote = await ballotContract.connect(acc1).vote(1, 10);
      await castingVote.wait();
      const votePower = await ERC20Contract.getVotes(acc1.address);
      expect(votePower).to.eq(0);
    });
  });

  describe("checking vote power", () => {
    it("should transfer voting power", async () => {
      const [deployer, acc1, acc2] = await ethers.getSigners();
      const votePower0 = await ERC20Contract.getVotes(deployer.address);
      expect(votePower0).to.eq(0);
      const votePower1 = await ERC20Contract.getVotes(acc1.address);
      expect(votePower1).to.eq(0);
      const votePower2 = await ERC20Contract.getVotes(acc2.address);
      expect(votePower2).to.eq(0);
    });
  });

  describe("querying results", () => {
    it("winner should be Proposal 1", async () => {
      const winner = await ballotContract.winnerName();
      expect(ethers.utils.formatBytes32String(winner)).to.eq(PROPOSALS[0]);
    });
  });
});
