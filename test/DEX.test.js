const { ethers, deployments } = require("hardhat");
const { expect } = require("chai");

describe("DEX Contract", function () {
    let DEX, TokenA, TokenB, dex, deployerTokenA, deployerTokenB, dexDeployer, user1;

    beforeEach(async function () {
        await deployments.fixture(['all']);
        [deployerTokenA, deployerTokenB, dexDeployer, user1] = await ethers.getSigners();
        TokenA = await ethers.getContract('Token', deployerTokenA);
        TokenB = await ethers.getContract('Token', deployerTokenB);
        DEX = await ethers.getContract('DEX', dexDeployer);
    });

    it("Should revert if same tokens are passed for swap", async function () {
        await expect(DEX.swap(TokenA.target, TokenA.target, user1, 100)).to.be.revertedWithCustomError(DEX,"Same_Token");
    });

    // it("Should perform a successful swap from Token A to Token B", async function () {
    //     // Approve tokenA transfer
    //     await TokenA.connect(addr1).approve(dex.address, 500);

    //     const rate = (await TokenA.totalSupply()).div(await TokenB.totalSupply());
    //     const expectedAmountB = (500 * rate) / 1e18;

    //     await dex.connect(addr1).swap(TokenA.target, TokenB.target, addr2, 500);

    //     expect(await TokenA.balanceOf(addr1)).to.equal(500);
    //     expect(await TokenB.balanceOf(addr1)).to.equal(expectedAmountB);
    // });

    // it("Should revert if sender has insufficient Token A balance", async function () {
    //     await expect(dex.connect(addr1).swap(TokenA.target, TokenB.target, addr2.address, 1500)).to.be.revertedWith("Insuficient_Balance");
    // });

    // it("Should revert if receiver has insufficient Token B balance", async function () {
    //     await TokenA.connect(addr1).approve(dex.address, 500);
    //     await expect(dex.connect(addr1).swap(TokenA.target, TokenB.target, addr1.address, 500)).to.be.revertedWith("Insuficient_Balance");
    // });
});
