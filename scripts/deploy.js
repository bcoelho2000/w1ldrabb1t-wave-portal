const { ethers } = require("hardhat");

async function main()
{
    const[deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account: ", deployer.address);
    console.log("Account Balance: ", (await deployer.getBalance()).toString());

    const Token = await ethers.getContractFactory("WavePortal2");
    const token = await Token.deploy();

    console.log("WavePortal Address:", token.address);
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
})