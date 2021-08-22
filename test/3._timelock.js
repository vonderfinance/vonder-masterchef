// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
const fs = require("fs");
const chalk = require("chalk");
const { config, ethers } = require("hardhat");
const { utils } = require("ethers");
const timelock = artifacts.require('timelock.sol');
async function main() {
    // This is just a convenience check
    if (network.name === "hardhat") {
        console.warn(
            "You are trying to deploy a contract to the Hardhat Network, which" +
            "gets automatically created and destroyed every time. Use the Hardhat" +
            " option '--network localhost'"
        );
    }

    // ethers is avaialble in the global scope
    const [deployer] = await ethers.getSigners();
    console.log(
        "Deploying the contracts with the account:",
        await deployer.getAddress()
    );

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const V3Migrator = await ethers.getContractFactory("V3Migrator");
    const V3Migrator = await V3Migrator.deploy();
    await V3Migrator.deployed();

    console.log("V3Migrator address:", V3Migrator.address);

    // We also save the contract's artifacts and address in the frontend directory
    saveFrontendFiles(V3Migrator);
}



main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
