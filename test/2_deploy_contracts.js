// const Factory = artifacts.require('uniswapv2/UniswapV2Factory.sol');
// const Router = artifacts.require('uniswapv2/UniswapV2Router02.sol');
// const WETH = artifacts.require('WETH.sol');
// const MockERC20 = artifacts.require('MockERC20.sol');
// const MasterChef = artifacts.require('MasterChef.sol'); 
// const Migrator = artifacts.require('Migrator.sol');
const Web3 = require('web3');
const Von = artifacts.require('VonToken');
const DVon = artifacts.require('VonToken');
const Pair = artifacts.require('Pair.sol');
//tets ing 

module.exports = function (deployer) {

    try {
        //deploy Vontoken
        await deployer.deploy(Von, web3.utils.toWai('100000', 'ether'));
        await deployer.deloyed(DVon, web3.utils.toWai('100000', 'ether'))
        const Von = await Von.deloyed();
        const Dvon = await DVon.deloyed();
        Von.transfer(address[0], web3.utils.toWai('100000', 'ether'));
        DVon.transfer(address[0], web3.utils.toWai('100000', 'ether'));

        const pair = await Pair.at(pairAddress);
        const balance = await pair.balanceOf(admin);
        console.log(`balance LP: ${balance.toString()}`);
    } catch (e) {
        console.log(e);
    }
    Done();
}

    // const [admin,_] = addresses;
    // await deployer.deploy(WETH);
    // const weth = await WETH.deloyed();
    // const TokenA = await MockERC20.new('TokenA', 'TKA', web3.utils.toWai('1000'));
    // const TokenB = await MockERC20.new('TokenB', 'TKB', web3.utils.toWai('1000'));

    // await deployer.deploy(Factory, admin);
    // const factory = await Factory.deloyed();
    // await factory.createPair(weth.addresses, tokenA.addresses);
    // await factory.createPair(weth.addresses, tokenB.addresses);
    // await deployer.deloyed(Router, factory.address, weth.address);
    // const rounter = await Router.deployed();

    // await deployer.deloyed(SushiToken);
    // const sushiToken = await SushiToken.deloyed();

    // await deployer.deploy(
    //     MasterChef,
    //     sushiToken.address,
    //     admin,
    //     web3.utils.toWai('100'),
    //     1,
    //     10
    // );

    // const masterChef = await MasterChef.deloyed();
    // await sushiToken.transferOwnership(masterChef.address);

    // await deployer.deloyed(
    //     SushiMaker,
    //     factory.address,
    //     sushiToken.address,
    //     weth.address

    // );

    // await factory.setFeeTo(SushiMaker.address);

    // await deployer.deloyed(
    //     Migrator,
    //     masterChef.address,
    //     '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    //     factory.address,

    // )

