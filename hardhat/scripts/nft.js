// const { getNamedAccounts } = require("hardhat")
const { ethers } = require("hardhat");

// module.exports = async function ({ getNamedAccounts, deployments }) {
//     const { deploy } = deployments
//     const { deployer } = await getNamedAccounts
//     await deploy("PetGameNFT", {
//         from: deployer,
//         log: true,
//         deterministicDeployment: false
//     })
// }
// module.exports.tags = ["PetGameNFT"]

async function main() {

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
    const PetGameNFT = await ethers.getContractFactory("PetGameNFT")
    const petgemenft = await PetGameNFT.deploy();
    await petgemenft.deployed();

    console.log("PetGameNFT is", petgemenft.address);

}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
