import { ethers } from "hardhat";

const BET_PRICE = 0.001;
const BET_FEE = 0.0002;
const TOKEN_RATIO = 1;

async function main() {
  const Contract = await ethers.getContractFactory("Lottery");
  const contract = await Contract.deploy(
    "LotteryToken",
    "LT0",
    TOKEN_RATIO,
    ethers.utils.parseEther(BET_PRICE.toFixed(18)),
    ethers.utils.parseEther(BET_FEE.toFixed(18))
  );

  await contract.deployed();

  console.log("Lottery deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
