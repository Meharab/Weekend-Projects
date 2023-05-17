import { ethers } from "hardhat";
import { MyERC20Votes__factory } from "../typechain-types";

const MINT_AMOUNT = ethers.utils.parseUnits("10");

async function main() {
  const [deployer, acc1, acc2] = await ethers.getSigners();
  const contractFactory = new MyERC20Votes__factory(deployer);
  const contract = await contractFactory.deploy();
  const contractDeployTxReceipt = await contract.deployTransaction.wait();
  console.log(
    `The contract was deployed at address ${contract.address} at block ${contractDeployTxReceipt.blockNumber}`
  );

  const mintTx = await contract.mint(acc1.address, MINT_AMOUNT);
  const mintTxReceipt = await mintTx.wait();
  console.log(
    `Minted ${ethers.utils.formatUnits(MINT_AMOUNT)} to the address ${
      acc1.address
    } at block ${mintTxReceipt.blockNumber}`
  );
  const balanceBN = await contract.balanceOf(acc1.address);
  console.log(
    `Account ${acc1.address} has ${ethers.utils.formatUnits(balanceBN)} tokens`
  );
  const votes = await contract.getVotes(acc1.address);
  console.log(
    `Account ${acc1.address} has ${ethers.utils.formatUnits(
      votes
    )} votes before self delegating`
  );
  const delegeteTx = await contract.connect(acc1).delegate(acc1.address);
  await delegeteTx.wait();
  const votesAfter = await contract.getVotes(acc1.address);
  console.log(
    `Account ${acc1.address} has ${ethers.utils.formatUnits(
      votesAfter
    )} votes after self delegating`
  );

  const transferTx = await contract
    .connect(acc1)
    .transfer(acc2.address, MINT_AMOUNT.div(2));
  await transferTx.wait();
  const votes1AfterTransfer = await contract.getVotes(acc1.address);
  console.log(
    `Account ${acc1.address} has ${ethers.utils.formatUnits(
      votes1AfterTransfer
    )} votes after tranfering`
  );
  const votes2AfterTransfer = await contract.getVotes(acc2.address);
  console.log(
    `Account ${acc2.address} has ${ethers.utils.formatUnits(
      votes2AfterTransfer
    )} votes after tranfering`
  );
  const lastBlock = await ethers.provider.getBlock("latest");
  console.log(`Current block number is ${lastBlock.number}`);

  for (let i = 1; i <= 3; i++) {
    const pastVotes = await contract.getPastVotes(
      acc1.address,
      lastBlock.number - i
    );
    console.log(
      `Account ${acc1.address} has ${ethers.utils.formatUnits(
        pastVotes
      )} votes at block ${lastBlock.number - i}`
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
