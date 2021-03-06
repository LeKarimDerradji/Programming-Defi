/* eslint-disable quotes */
/* eslint-disable no-undef */

const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Exchange', function () {
  let deployer, user1, user2, Token, token, Exchange, exchange;

  beforeEach(async function () {
    [deployer, user1, user2] = await ethers.getSigners();

    Token = await ethers.getContractFactory('Token');
    token = await Token.connect(deployer).deploy('Token', 'TKN', ethers.utils.parseEther('1000000'));
    await token.deployed();

    const tokenAddress = token.address;
    Exchange = await ethers.getContractFactory('Exchange');
    exchange = await Exchange.deploy(tokenAddress);
    await exchange.deployed();
    await token.connect(deployer).transfer(user1.address, 1000);
    await token.connect(deployer).transfer(user2.address, 1000);
  });
  it('Exhange is deployed', async function () {
    expect(await exchange.deployed()).to.equal(exchange);
  });
  it('User1 and User2 should have 1000 tokens', async function () {
    expect(await token.balanceOf(user1.address)).to.equal(1000);
    expect(await token.balanceOf(user2.address)).to.equal(1000);
  });
  describe('Approval and Transfers to exchange', async function () {
    beforeEach(async function () {
      await token.connect(user1).approve(exchange.address, 200);
      await token.connect(user2).approve(exchange.address, 200);
    });
    it('Should succesfully approve exhange to spend 200 tokens for user1', async function () {
      expect(await token.allowance(user1.address, exchange.address)).to.eq(200);
    });
    it('Should succesfully approve exhange to spend 200 tokens for user2', async function () {
      expect(await token.allowance(user2.address, exchange.address)).to.eq(200);
    });
    it('Should change tokenBalance of exchange when user1 submit transfer', async function () {
      await expect(() => token.connect(user1).transfer(exchange.address, 100)).to.changeTokenBalance(
        token,
        exchange,
        100,
      );
    });
    it('Should change tokenBalance of exchange when user1 submit transfer', async function () {
      await expect(() => token.connect(user2).transfer(exchange.address, 100)).to.changeTokenBalance(
        token,
        exchange,
        100,
      );
    });
  });
});
