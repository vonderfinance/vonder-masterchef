const IFO = artifacts.require("IFO");

module.exports = async (deployer) => {
  // const num = 50 * Math.pow(10, 18);
  // const numAsHex = "0x" + num.toString(16);

  const lpToken = '0xf1047345b3821729BE43A3BE35086a2635E5f08a'; //Von-Kub
  const offeringToken = '0x14dDdBa9FAb29e274129059b9A23D5eE1aA5d1A6'; //lullabyclinic
  const startBlock = '1926972';
  const endBlock = '2007972';
  const offeringAmount = '1000000';
  const raisingAmount = '10000';
  const adminAddress = '0x01A70c172c7F15c74975DD57771FA0dFC7507A52';
  await deployer.deploy(
    IFO,
    lpToken,
    offeringToken,
    startBlock,
    endBlock,
    offeringAmount,
    raisingAmount,
    adminAddress
  );
};
