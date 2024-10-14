const { ethers, deployments } = require("hardhat");
const { expect } = require("chai");

describe("DEX Contract", function () {
    let Token, DEX, tokenA, tokenB, dex, owner, addr1, addr2;

    beforeEach(async function () {
        Token = await ethers.getContractFactory("Token");
        DEX = await ethers.getContractFactory("DEX");

        [owner, addr1, addr2] = await ethers.getSigners();

        // Deploy two tokens (Token A and Token B)
        tokenA = await Token.deploy(1000, 5000, "Token A", "TKA");
        tokenB = await Token.deploy(850, 5000, "Token B", "TKB");

        await tokenA.deployed();
        await tokenB.deployed();

        // Deploy DEX contract
        dex = await DEX.deploy();
        await dex.waitForDeployment();

        // Mint some tokens to addr1
        await tokenA.mint(1000, addr1.address);
        await tokenB.mint(850, addr2.address);
    });

    it("Should revert if same tokens are passed for swap", async function () {
        await expect(dex.swap(tokenA.address, tokenA.address, addr1.address, 100)).to.be.revertedWith("Same_Token");
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
