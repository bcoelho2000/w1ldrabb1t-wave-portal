const { ethers } = require("hardhat");

async function main()
{
    const[deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account: ", deployer.address);
    console.log("Account Balance: ", (await deployer.getBalance()).toString());

    const waveContractFactory = await ethers.getContractFactory("WavePortal2");
    const waveContract = await waveContractFactory.deploy({value: ethers.utils.parseEther("0.01")});
    await waveContract.deployed();
    console.log("WavePortal Address:", waveContract.address);

    //npx hardhat run scripts/deploy.js --network rinkeby
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
})
