const hre = require("hardhat");

async function main() {
	const Contract = await hre.ethers.getContractFactory("MyERC1155");
	const contract = await Contract.deploy();

	await contract.deployed();

	console.log("MyERC1155 deployed to:", contract.address);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});