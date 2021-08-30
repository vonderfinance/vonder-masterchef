require("@nomiclabs/hardhat-waffle");
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-etherscan");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");

const { INFURA_API_KEY, mnemonic, privateKey1, privateKey2, etherApiKey, bscApiKey } = require('./secrets.json');

module.exports = {
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: `${bscApiKey}`
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
  solidity: {
    compilers: [
      {
        version: "0.7.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200000,
          }
        }
      },
      {
        version: "0.8.0",   // for custom oracle and openzeppelin
        settings: {
          optimizer: {
            enabled: true,
            runs: 20000,
          }
        },
      },
    ],
    overrides: {
      "contracts/VonderToken.sol": {
        version: "0.6.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 20000,
          }
        }
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
    deploy: "./deploy",
    deployments: "./deployments",
    imports: "./imports",
  },
  mocha: {
    timeout: 20000,
  },
};
