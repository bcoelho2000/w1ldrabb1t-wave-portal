
async function main()
{
    const [owner, randoPerson] = await hre.ethers.getSigners();

    // Compile our contract and generate the necessary files we need to work with our contract under the artifacts directory
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal2");

    /*
    Hardhat will create a local Etehreum network for us, but just for this contract.
    Then, after the script completes it’ll destroy that local network.
    So, every time you run the contract, it’ll be a fresh blockchain.
    Whats the point? It’s kinda like refreshing your local server every time
        so you always start from a clean slate which makes it easy to debug errors.
    */
    const waveContract = await waveContractFactory.deploy({value: hre.ethers.utils.parseEther("0.1")});

    // We’ll wait until our contract is officially deployed to our local blockchain! Our `constructor` runs when we actually deploy.
    await waveContract.deployed();

    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);

    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("contractBalance: ", hre.ethers.utils.formatEther(contractBalance));

    console.log("waving...")

    for (let i=0; i<10;++i)
    {
      let waveTxn = await waveContract.wave("A message");
      await waveTxn.wait();
    }

    console.log("read getWavesSlice(0,3)...");
    let wavesSlice03 = await waveContract.getWavesSlice(0,3);
    for(let i=0; i<3; ++i)
    {
      console.log(wavesSlice03[i].message);
    }
    console.log("done.");

}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
})
