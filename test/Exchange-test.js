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
    await token.connect(deployer).transfer(user1.address, ethers.utils.parseEther("100"));
    await token.connect(deployer).transfer(user2.address, ethers.utils.parseEther("100"));
  });
  it("Should return the new greeting once it's changed", async function () {
    
  });
});
