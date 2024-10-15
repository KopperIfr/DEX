const { ethers, deployments } = require("hardhat");
const { expect } = require("chai");

describe("DEX Contract", function () {
    let Token, DEX, TokenA, TokenB, dex, deployerTokenA, deployerTokenB, dexDeployer, user1;

    beforeEach(async function () {
        [deployerTokenA, deployerTokenB, dexDeployer, user1] = await ethers.getSigners();
        
        TokenA = await ethers.getContract('Token', deployerTokenA);
        TokenB = await ethers.getContract('Token', deployerTokenB);
        DEX = await ethers.getContract('DEX', dexDeployer);

        console.log(DEX.target);
    });

    it("Should revert if same tokens are passed for swap", async function () {
        await expect(DEX.swap(TokenA.target, TokenA.target, user1, 100)).to.be.revertedWith("Same_Token");
    });

    it("Should perform a successful swap from Token A to Token B", async function () {
        // Approve tokenA transfer
        await tokenA.connect(addr1).approve(dex.address, 500);

        const rate = (await tokenA.totalSupply()).div(await tokenB.totalSupply());
        const expectedAmountB = (500 * rate) / 1e18;

        await dex.connect(addr1).swap(tokenA.address, tokenB.address, addr2.address, 500);

        expect(await tokenA.balanceOf(addr1.address)).to.equal(500);
        expect(await tokenB.balanceOf(addr1.address)).to.equal(expectedAmountB);
    });

    it("Should revert if sender has insufficient Token A balance", async function () {
        await expect(dex.connect(addr1).swap(tokenA.address, tokenB.address, addr2.address, 1500)).to.be.revertedWith("Insuficient_Balance");
    });

    it("Should revert if receiver has insufficient Token B balance", async function () {
        await tokenA.connect(addr1).approve(dex.address, 500);
        await expect(dex.connect(addr1).swap(tokenA.address, tokenB.address, addr1.address, 500)).to.be.revertedWith("Insuficient_Balance");
    });
});
