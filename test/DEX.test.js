const { ethers, deployments } = require("hardhat");
const { expect } = require("chai");

describe("DEX Contract", function () {

    // Initializing variables..
    let DEX, TokenA, TokenB, deployerTokenA, deployerTokenB, dexDeployer, user1, user2;

    beforeEach(async function () {

        // Getting signers..
        [deployerTokenA, deployerTokenB, dexDeployer, user1, user2] = await ethers.getSigners();

        // Getting contract facotories..
        let Token = await ethers.getContractFactory('Token', deployerTokenA);
        let dex = await ethers.getContractFactory('DEX', dexDeployer);

        // Deploying token A..
        TokenA = await Token.deploy(
            ethers.parseUnits("1000000", 18),
            ethers.parseUnits("1000000", 18),
            'TokenA',
            'TKA'
        );

        // Deploying token B..
        TokenB = await Token.connect(deployerTokenB).deploy(
            ethers.parseUnits("800000", 18),
            ethers.parseUnits("1000000", 18),
            'TokenB',
            'TKB'
        );

        // Deploying DEX..
        DEX = await dex.deploy();

        // Waiting for our contracts to deploy..
        await TokenA.waitForDeployment();
        await TokenB.waitForDeployment();
        await DEX.waitForDeployment();
    });

    it("Should revert if same tokens are passed for swap", async function () {
        await expect(DEX.swap(
            TokenA.target, 
            TokenA.target, 
            deployerTokenA.address, 
            100)).to.be.revertedWithCustomError(DEX,"Same_Token");
    });

    it("Should perform a successful swap from Token A to Token B", async function () {

        // Saving the amount of token each address has before transfering..
        const deployerATokenAQuantityBefore = await TokenA.balanceOf(deployerTokenA.address);
        const deployerBTokenAQuantityBefore = await TokenA.balanceOf(deployerTokenB.address);

        // Aproving our Tokens to transfer from our DEX contract..
        await TokenA.connect(deployerTokenA).approve(DEX.target, ethers.parseUnits("100000", 18));
        await TokenB.connect(deployerTokenB).approve(DEX.target, ethers.parseUnits("100000", 18));

        // Calling the swap function..
        await DEX.connect(deployerTokenA).swap(TokenA.target, TokenB.target, deployerTokenB.address, ethers.parseUnits("100000", 18));

        // Saving the token amount each address has after the transfer..
        const deployerATokenAQuantityAfter = await TokenA.balanceOf(deployerTokenA.address);
        const deployerBTokenAQuantityAfter = await TokenA.balanceOf(deployerTokenB.address);

        // Checking that the balances of each address have indeed incremented and decremented..
        expect(deployerATokenAQuantityAfter).to.be.below(deployerATokenAQuantityBefore);
        expect(deployerBTokenAQuantityAfter).to.be.above(deployerBTokenAQuantityBefore);
    });
    

    it("Should revert if sender has insufficient Token A balance", async function () {
        await expect(DEX.connect(user1).swap(
            TokenA.target, 
            TokenB.target, 
            user2.address, 
            ethers.parseUnits("120000", 18)
        )).to.be.revertedWithCustomError(DEX, "Insuficient_Balance");
    });

    it("Should revert if receiver has insufficient Token B balance", async function () {
        await TokenA.connect(deployerTokenA).approve(DEX.target, 500);
        await expect(DEX.connect(user1).swap(
            TokenA.target, 
            TokenB.target, 
            user1.address, 
            500
        )).to.be.revertedWithCustomError(DEX, "Insuficient_Balance");
    });
});
