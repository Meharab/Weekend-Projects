import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config();

const ALCHEMY_API_URL = process.env.ALCHEMY_API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const config: HardhatUserConfig = {
  paths: { tests: "tests" },
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: ALCHEMY_API_URL,
      accounts: [PRIVATE_KEY ?? ""],
    },
  },
};

export default config;
