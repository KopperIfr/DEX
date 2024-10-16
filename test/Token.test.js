const { expect } = require("chai");
const { ethers, deployments } = require("hardhat");
const { INITIAL_SUPPLY_TOKEN_A, MAX_SUPPLY_TOKEN_A } = require('../hardhat-config-helper.js');

describe("Token Contract", function () {
    let Token, token, admin, user1, user2;

    beforeEach(async function () {

        [admin, user1, user2] = await ethers.getSigners();

        token = await ethers.getContractFactory('Token', admin);

        Token = await token.deploy(
            ethers.parseUnits("900000", 18),
            MAX_SUPPLY_TOKEN_A,
            'TokenA',
            'TKA'
        );

        await Token.waitForDeployment();

    });


    it("Should revert when initial supply exceeds maxSupply in constructor", async function () {
        await expect(
            token.deploy(
                ethers.parseUnits("1100000", 18),
                MAX_SUPPLY_TOKEN_A,
                'TokenA',
                'TKA'
            )
        ).to.be.revertedWithCustomError(token, "Exceded_Max_Supply");
    });
    

    it("Should set the right owner", async function () {
        expect(await Token.admin()).to.equal(admin);
    });

    it("Should not mint if exceeds maxSupply", async function () {
        await expect(Token.mint(ethers.parseUnits("120000", 18), user1.address)).to.be.revertedWithCustomError(Token, "Exceded_Max_Supply");
    });

    it("Should mint tokens correctly", async function () {
        await Token.mint(
            ethers.parseUnits("1200", 18), 
            user1.address
        );
        expect(await Token.balanceOf(user1.address)).to.equal(ethers.parseUnits("1200", 18));
        expect(await Token.totalSupply()).to.equal(ethers.parseUnits("901200", 18));
    });

    it("Should burn tokens correctly", async function () {
        await Token.burn(ethers.parseUnits("100000", 18));
        expect(await Token.totalSupply()).to.equal(ethers.parseUnits("800000", 18)); // 1000 - 500 = 500
    });

    it("Should revert if non-admin tries to mint", async function () {
        await expect(Token.connect(user1).mint(1000, user1.address)).to.be.revertedWithCustomError(Token,"Only_Admin");
    });

    it("Should revert if amount is 0 in mint", async function () {
        await expect(Token.mint(0, user1.address)).to.be.revertedWithCustomError(Token,"Amount_Required");
    });

    it("Should transfer admin role", async function () {
        await Token.setAdmin(user1.address);
        expect(await Token.admin()).to.equal(user1.address);
    });

    it("Should revert if non-admin tries to change admin", async function () {
        await expect(Token.connect(user1).setAdmin(user2.address)).to.be.revertedWithCustomError(Token, "Only_Admin");
    });
});
