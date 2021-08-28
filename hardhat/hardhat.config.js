require("@nomiclabs/hardhat-waffle");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");

const { INFURA_API_KEY, mnemonic, privateKey1, privateKey2, etherApiKey } = require('./secrets.json');

module.exports = {
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: `${etherApiKey}`
  },
  networkderfu: "koven",
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`,
      accounts: { mnemonic: mnemonic }
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [privateKey1, privateKey2],
      apiKey: [etherApiKey]
    },
    bsctestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [privateKey1, privateKey2]
    },
    hardhat: {
      mining: {
        auto: false,
        interval: [3000, 6000, 9000] // config interval mining to generate a new block after a radom delay of between 3, 6, 9 seconds
      },
      forking: {
        url: "https://eth-mainnet.alchemyapi.io/v2/<key>", // npx hardhat node --fork https://eth-mainnet.alchemyapi.io/v2/<key> --fork-block-number 11095000
        blockNumber: 11095000
      }
    }
  },
  solidity: "0.7.3"
};
