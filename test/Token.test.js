const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token Contract", function () {
    let Token, token, owner, addr1, addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        // Deploy Token contract with initialSupply = 1000 and maxSupply = 5000
        token = await ethers.getContract('Token', owner);
    });

    it("Should set the right owner", async function () {
        expect(await token.admin()).to.equal(owner.address);
    });

    it("Should mint tokens correctly", async function () {
        await token.mint(1000, addr1.address);
        expect(await token.balanceOf(addr1.address)).to.equal(1000);
        expect(await token.totalSupply()).to.equal(2000); // Initial + new mint
    });

    it("Should not mint if exceeds maxSupply", async function () {
        await expect(token.mint(5001, addr1.address)).to.be.revertedWith("Exceded_Max_Supply");
    });

    it("Should burn tokens correctly", async function () {
        await token.burn(500);
        expect(await token.totalSupply()).to.equal(500); // 1000 - 500 = 500
    });

    it("Should revert if non-admin tries to mint", async function () {
        await expect(token.connect(addr1).mint(1000, addr1.address)).to.be.revertedWith("Only_Admin");
    });

    it("Should revert if amount is 0 in mint", async function () {
        await expect(token.mint(0, addr1.address)).to.be.revertedWith("Amount_Required");
    });

    it("Should transfer admin role", async function () {
        await token.setAdmin(addr1.address);
        expect(await token.admin()).to.equal(addr1.address);
    });

    it("Should revert if non-admin tries to change admin", async function () {
        await expect(token.connect(addr1).setAdmin(addr2.address)).to.be.revertedWith("Only_Admin");
    });
});
