const { task } = require("hardhat/config");

require("dotenv").config();

require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("@openzeppelin/hardhat-upgrades");

task("deploy", "Deploy contract").setAction(async () => {
  const deploy = require("./scripts/deploy");
  await deploy();
});

task("upgrade", "Upgrade contract").setAction(async () => {
  const upgrade = require("./scripts/upgrade");
  await upgrade();
});

task("deploy-checker", "Deploy BalanceChecker contract").setAction(async () => {
  const deploy = require("./scripts/deploy-checker");
  await deploy();
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "metis",
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    },
  },
  networks: {
    metis: {
      chainId: 1088,
      url: "https://andromeda.metis.io/?owner=1088",
      accounts: [process.env.PRIVATE_KEY],
      gasMultiplier: 1
    },
  },
  etherscan: {
    apiKey: {
      metis: process.env.METIS_API_KEY,
    },
    customChains: [
      {
        network: "metis",
        chainId: 1088,
        urls: {
          apiURL: "https://andromeda-explorer.metis.io/api",
          browserURL: "https://andromeda-explorer.metis.io/",
        },
      },
    ],
  },
  sourcify: {
    enabled: false
  }
};
