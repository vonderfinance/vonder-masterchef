const MasterChef = artifacts.require('MasterChef');
// const VonderToken = artifacts.require('VonderToken');
const Web3 = require('web3');

module.exports = async function(deployer, network, addresses) {
  const [admin, _] = addresses;

  const DEVADDRESS = "0x4d2f9077f357c4296dab5fcd27db793ed6e0aeae";
  const FEEADDRESS = "0x4d228fea98cbce2d891caa7e50d452e5809b48e8";

  const VonderToken = {
    address: "0xB473Bf366219855E55aa6854f111b374496F3404" // recently on bkc testnet
  }

  // const startBlock = 718880; // on bkc mainnet
  const startBlock = 9841275; // on bsc testnet
  const vonPerBlock = Web3.utils.toWei('80', 'ether');

  await deployer.deploy(MasterChef, VonderToken.address, DEVADDRESS, FEEADDRESS, vonPerBlock, startBlock, { from: admin });

};