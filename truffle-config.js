const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const fs = require('fs');

const { infuraProjectId, mainnetBkcPrivateKeys, testnetBkcPrivateKeys, mainnetPrivateKeys, privateKeys, etherApiKey, bscApiKey } = JSON.parse(fs.readFileSync('.secret').toString().trim());

const binanceMainnetProvider = new HDWalletProvider({
    privateKeys: privateKeys,
    providerOrUrl: `https://bsc-dataseed1.defibit.io`
});

const binanceTestnetProvider = new HDWalletProvider({
    privateKeys: privateKeys,
    providerOrUrl: `https://data-seed-prebsc-1-s1.binance.org:8545`
});

const bitkubMainnetProvider = new HDWalletProvider({
    privateKeys: mainnetBkcPrivateKeys,
    providerOrUrl: `https://rpc.bitkubchain.io`
});

const bitkubTestnetProvider = new HDWalletProvider({
    privateKeys: testnetBkcPrivateKeys,
    providerOrUrl: `https://rpc-testnet.bitkubchain.io`
});

module.exports = {
    // Uncommenting the defaults below
    // provides for an easier quick-start with Ganache.
    // You can also follow this format for other networks;
    // see <http://truffleframework.com/docs/advanced/configuration>
    // for more details on how to specify configuration options!
    //
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*"
        },
        test: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*"
        },
        bscMainnet: {
            provider: () => binanceMainnetProvider,
            network_id: '56',
            gas: 5500000,
            gasPrice: Web3.utils.toWei('10', 'gwei'),
            skipDryRun: true,
        },
        bscTestnet: {
            provider: () => binanceTestnetProvider,
            network_id: '97',
            gas: 5500000,
            gasPrice: Web3.utils.toWei('10', 'gwei'),
            skipDryRun: true,
        },
        bkcMainnet: {
            provider: () => bitkubMainnetProvider,
            network_id: '96',
            gas: 5500000,
            gasPrice: Web3.utils.toWei('5', 'gwei'),
            skipDryRun: true,
        },
        bkcTestnet: {
            provider: () => bitkubTestnetProvider,
            network_id: '25925',
            gas: 5500000,
            gasPrice: Web3.utils.toWei('5', 'gwei'),
            skipDryRun: true,
        },
    },
    //
    compilers: {
        solc: {
            version: "0.6.12",
            settings: { // See the solidity docs for advice about optimization and evmVersion
                optimizer: {
                    enabled: true,
                    runs: 200
                },
                //  evmVersion: 'byzantium'
            }
        }
    },
    plugins: [
        'truffle-plugin-verify'
    ],
    api_keys: {
        etherscan: etherApiKey,
        bscscan: bscApiKey,
    }
};