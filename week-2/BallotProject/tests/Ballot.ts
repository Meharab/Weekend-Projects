import { expect } from "chai";
import { ethers } from "hardhat";
import { Ballot } from "../typechain-types";

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

describe("Ballot", () => {
  let ballotContract: Ballot;

  beforeEach(async () => {
    const ballotFactory = await ethers.getContractFactory("Ballot");
    ballotContract = await ballotFactory.deploy(
      convertStringArrayToBytes32(PROPOSALS)
    );
    await ballotContract.deployed();
  });

  describe("when the contract is deployed", () => {
    it("has the provided proposals", async () => {
      for (let index = 0; index < PROPOSALS.length; index++) {
        const proposal = await ballotContract.proposals(index);
        expect(ethers.utils.parseBytes32String(proposal.name)).to.eq(
          PROPOSALS[index]
        );
      }
    });

    it("has zero votes for all proposals", async () => {
      for (let index = 0; index < PROPOSALS.length; index++) {
        const proposal = await ballotContract.proposals(index);
        expect(proposal.voteCount).to.eq(0);
      }
    });
    it("sets the deployer address as chairperson", async () => {
      const chairperson = await ballotContract.chairperson();
      const accounts = await ethers.getSigners();
      expect(chairperson).to.eq(accounts[0].address);
    });
    it("sets the voting weight for the chairperson as 1", async () => {
      const accounts = await ethers.getSigners();
      const voter = await ballotContract.voters(accounts[0].address);
      expect(voter.weight).to.eq(1);
    });
  });

  describe("when the chairperson interacts with the giveRightToVote function in the contract", () => {
    it("gives right to vote for another address", async () => {
      const accounts = await ethers.getSigners();
      const voter = accounts[1].address;
      await ballotContract.giveRightToVote(voter);
      const newVoter = await ballotContract.voters(accounts[0].address);
      expect(newVoter.weight).to.eq(1);
    });
    it("can not give right to vote for someone that has voted", async () => {
      const accounts = await ethers.getSigners();
      const voter = accounts[1];
      await ballotContract.giveRightToVote(voter.address);
      await ballotContract.connect(voter).vote(0);
      await expect(ballotContract.connect(accounts[0]).giveRightToVote(voter.address))
        .to.be.reverted;
    });
    it("can not give right to vote for someone that has already voting rights", async () => {
      const accounts = await ethers.getSigners();
      const voter = accounts[1].address;
      await ballotContract.giveRightToVote(voter);
      await expect(ballotContract.giveRightToVote(voter)).to.be.reverted;
    });
  });

  describe("when the voter interact with the vote function in the contract", () => {
    it("should register the vote", async () => {
      await ballotContract.vote(0);
      const proposal = await ballotContract.proposals(0);
      await expect(proposal.voteCount).to.eq(1);
    });
  });

  describe("when the voter interact with the delegate function in the contract", () => {
    it("should transfer voting power", async () => {
      const accounts = await ethers.getSigners();
      const delegatingAccount = accounts[0];
      const delegatedAccount = accounts[1];
      await ballotContract.giveRightToVote(delegatedAccount.address);
      await ballotContract
        .connect(delegatingAccount)
        .delegate(delegatedAccount.address);
      const delegatedAccountVoter = await ballotContract.voters(
        delegatedAccount.address
      );
      await expect(delegatedAccountVoter.weight).to.eq(2);
    });
  });

  describe("when the an attacker interact with the giveRightToVote function in the contract", () => {
    it("should revert", async () => {
      const accounts = await ethers.getSigners();
      const attacker = accounts[1];
      await expect(
        ballotContract.connect(attacker).giveRightToVote(attacker.address)
      ).to.be.reverted;
    });
  });

  describe("when the an attacker interact with the vote function in the contract", () => {
    it("should revert", async () => {
      const accounts = await ethers.getSigners();
      const attacker = accounts[1];
      await expect(ballotContract.connect(attacker).vote(0)).to.be.reverted;
    });
  });

  describe("when the an attacker interact with the delegate function in the contract", () => {
    it("should revert", async () => {
      const accounts = await ethers.getSigners();
      const attacker = accounts[1];
      const address = accounts[2].address;
      await expect(ballotContract.connect(attacker).delegate(address)).to.be
        .reverted;
    });
  });

  describe("when someone interact with the winningProposal function before any votes are cast", () => {
    it("should return 0", async () => {
      expect(await ballotContract.winningProposal()).to.eq(0);
    });
  });

  describe("when someone interact with the winningProposal function after one vote is cast for the first proposal", () => {
    it("should return 0", async () => {
      await ballotContract.vote(0);
      expect(await ballotContract.winningProposal()).to.eq(0);
    });
  });

  describe("when someone interact with the winnerName function before any votes are cast", () => {
    it("should return name of proposal 0", async () => {
      const winnerName = await ballotContract.winnerName();
      expect(ethers.utils.parseBytes32String(winnerName)).to.eq(PROPOSALS[0]);
    });
  });

  describe("when someone interact with the winnerName function after one vote is cast for the first proposal", () => {
    it("should return name of proposal 0", async () => {
      await ballotContract.vote(0);
      const winnerName = await ballotContract.winnerName();
      expect(ethers.utils.parseBytes32String(winnerName)).to.eq(PROPOSALS[0]);
    });
  });

  describe("when someone interact with the winningProposal function and winnerName after 5 random votes are cast for the proposals", () => {
    it("should return the name of the winner proposal", async () => {
      const accounts = await ethers.getSigners();

      await ballotContract.giveRightToVote(accounts[1].address);
      await ballotContract.giveRightToVote(accounts[2].address);
      await ballotContract.giveRightToVote(accounts[3].address);
      await ballotContract.giveRightToVote(accounts[4].address);
      await ballotContract.giveRightToVote(accounts[5].address);

      await ballotContract.connect(accounts[1]).vote(2);
      await ballotContract.connect(accounts[2]).vote(1);
      await ballotContract.connect(accounts[3]).vote(2);
      await ballotContract.connect(accounts[4]).vote(0);
      await ballotContract.connect(accounts[5]).vote(2);

      const winnerName = await ballotContract.connect(accounts[0]).winnerName();
      expect(ethers.utils.parseBytes32String(winnerName)).to.eq(PROPOSALS[2]);
    });
  });
});
