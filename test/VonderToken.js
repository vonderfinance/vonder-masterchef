const VonderToken = artifacts.require("VonderToken");
const MasterChef = artifacts.require('MasterChef');
const MockBEP20 = artifacts.require('libs/MockBEP20');
const { expectRevert, time } = require('@openzeppelin/test-helpers');

contract('VonderToken', ([alice, bob, carol, dev, minter]) => {
    beforeEach(async () => {
        this.von = await VonderToken.new({ from: minter });
    });

    // mint coin to alice wallet
    it('mint', async () => {
        await this.von.mint(alice, 1000, { from: minter });
        assert.equal((await this.von.balanceOf(alice)).toString(), '1000');
    })
});

contract('MasterChef', ([alice, bob, feeDev, dev, minter]) => {
  beforeEach(async () => {
      this.von = await VonderToken.new({ from: minter });
      this.lp1 = await MockBEP20.new('LPToken', 'LP1', '1000000', { from: minter });
      this.lp2 = await MockBEP20.new('LPToken', 'LP2', '1000000', { from: minter });
      this.lp3 = await MockBEP20.new('LPToken', 'LP3', '1000000', { from: minter });
      this.chef = await MasterChef.new(this.von.address, dev, feeDev, '1000', '100', { from: minter });
      await this.von.transferOwnership(this.chef.address, { from: minter });

      await this.lp1.transfer(bob, '2000', { from: minter });
      await this.lp2.transfer(bob, '2000', { from: minter });
      await this.lp3.transfer(bob, '2000', { from: minter });

      await this.lp1.transfer(alice, '10001', { from: minter });
      await this.lp2.transfer(alice, '2000', { from: minter });
      await this.lp3.transfer(alice, '2000', { from: minter });
  });

  // tranfer coin to each wallet
  it('real case', async () => {
    this.lp4 = await MockBEP20.new('LPToken', 'LP1', '1000000', { from: minter });
    this.lp5 = await MockBEP20.new('LPToken', 'LP2', '1000000', { from: minter });
    this.lp6 = await MockBEP20.new('LPToken', 'LP3', '1000000', { from: minter });
    this.lp7 = await MockBEP20.new('LPToken', 'LP1', '1000000', { from: minter });
    this.lp8 = await MockBEP20.new('LPToken', 'LP2', '1000000', { from: minter });
    this.lp9 = await MockBEP20.new('LPToken', 'LP3', '1000000', { from: minter });
    await this.chef.add('2000', this.lp1.address, 0, true, { from: minter });
    await this.chef.add('1000', this.lp2.address, 0, true, { from: minter });
    await this.chef.add('500', this.lp3.address, 0, true, { from: minter });
    await this.chef.add('500', this.lp3.address, 0, true, { from: minter });
    await this.chef.add('500', this.lp3.address, 0, true, { from: minter });
    await this.chef.add('500', this.lp3.address, 0, true, { from: minter });
    await this.chef.add('500', this.lp3.address, 0, true, { from: minter });
    await this.chef.add('100', this.lp3.address, 0, true, { from: minter });
    await this.chef.add('100', this.lp3.address, 0, true, { from: minter });
    assert.equal((await this.chef.poolLength()).toString(), "9");

    await time.advanceBlockTo('10300');
    await this.lp1.approve(this.chef.address, '1000', { from: alice });
    assert.equal((await this.von.balanceOf(alice)).toString(), '0');
    await this.chef.deposit(0, '20', { from: alice });
    await this.chef.withdraw(0, '20', { from: alice });
    assert.equal((await this.von.balanceOf(alice)).toString(), '105');
  })

  // deposit and withdraw
  it('deposit/withdraw', async () => {
    await this.chef.add('1000', this.lp1.address, 0, true, { from: minter });
    await this.chef.add('1000', this.lp2.address, 0, true, { from: minter });
    await this.chef.add('1000', this.lp3.address, 0, true, { from: minter });

    await this.lp1.approve(this.chef.address, '100', { from: alice });
    await this.chef.deposit(0, '20', { from: alice });
    await this.chef.deposit(0, '0', { from: alice });
    await this.chef.deposit(0, '40', { from: alice });
    await this.chef.deposit(0, '0', { from: alice });
    assert.equal((await this.lp1.balanceOf(alice)).toString(), '1940');
    await this.chef.withdraw(0, '10', { from: alice });
    assert.equal((await this.lp1.balanceOf(alice)).toString(), '1950');
    assert.equal((await this.von.balanceOf(alice)).toString(), '400');
    assert.equal((await this.von.balanceOf(dev)).toString(), '132');

    await this.lp1.approve(this.chef.address, '100', { from: bob });
    assert.equal((await this.lp1.balanceOf(bob)).toString(), '2000');
    await this.chef.deposit(0, '50', { from: bob });
    assert.equal((await this.lp1.balanceOf(bob)).toString(), '1950');
    await this.chef.deposit(0, '0', { from: bob });
    assert.equal((await this.von.balanceOf(bob)).toString(), '50');
    await this.chef.emergencyWithdraw(1, { from: bob });
    assert.equal((await this.lp1.balanceOf(bob)).toString(), '1950');
  })

  //deposit whith deposite fee 10000
  it('deposit while 10000 deposite fee', async () => {
    await this.chef.add('10001', this.lp1.address, 5000, true, { from: minter });
    await this.chef.add('1000', this.lp2.address, 5000, true, { from: minter });
    await this.chef.add('1000', this.lp3.address, 5000, true, { from: minter });

    await this.lp1.approve(this.chef.address, '10000', { from: alice });
    await this.chef.deposit(0, '10000', { from: alice });
    assert.equal((await this.lp1.balanceOf(alice)).toString(), '1');
    await this.chef.withdraw(0, '10', { from: alice });
    assert.equal((await this.lp1.balanceOf(alice)).toString(), '11');
  })

  //staking and unstaking
  it('staking/unstaking', async () => {
    await this.chef.add('1000', this.lp1.address, 0, true, { from: minter });
    await this.chef.add('1000', this.lp2.address, 0, true, { from: minter });
    await this.chef.add('1000', this.lp3.address, 0, true, { from: minter });

    await this.lp1.approve(this.chef.address, '10', { from: alice });
    await this.chef.deposit(0, '2', { from: alice }); //0
    await this.chef.withdraw(0, '2', { from: alice }); //1
  });


  it('update multiplier', async () => {
    await this.chef.add('1000', this.lp1.address, 0, true, { from: minter });
    await this.chef.add('1000', this.lp2.address, 0, true, { from: minter });
    await this.chef.add('1000', this.lp3.address, 0, true, { from: minter });

    await this.lp1.approve(this.chef.address, '100', { from: alice });
    await this.lp1.approve(this.chef.address, '100', { from: bob });
    await this.chef.deposit(0, '100', { from: alice });
    await this.chef.deposit(0, '100', { from: bob });
    await this.chef.deposit(0, '0', { from: alice });
    await this.chef.deposit(0, '0', { from: bob });

    await this.von.approve(this.chef.address, '100', { from: alice });
    await this.von.approve(this.chef.address, '100', { from: bob });

    await this.chef.deposit(0, '0', { from: alice });
    await this.chef.deposit(0, '0', { from: bob });

    assert.equal((await this.von.balanceOf(alice)).toString(), '351');
    assert.equal((await this.von.balanceOf(bob)).toString(), '300');

    await time.advanceBlockTo('10400');
  });

  // only dev address as update
  it('should allow dev and only dev to update dev', async () => {
      assert.equal((await this.chef.devaddr()).valueOf(), dev);
      await expectRevert(this.chef.dev(bob, { from: bob }), 'dev: wut?');
      await this.chef.dev(bob, { from: dev });
      assert.equal((await this.chef.devaddr()).valueOf(), bob);
  })
});