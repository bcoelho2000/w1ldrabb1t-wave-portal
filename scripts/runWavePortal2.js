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
    const waveContract = await waveContractFactory.deploy();
    
    // We’ll wait until our contract is officially deployed to our local blockchain! Our `constructor` runs when we actually deploy.
    await waveContract.deployed();

    console.log("Contract deployed to:", waveContract.address); 
    console.log("Contract deployed by:", owner.address); 

    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    console.log("wave count: %d", waveCount);

    let waveTxn = await waveContract.connect(randoPerson).wave("This is a message!");
    await waveTxn.wait();
    console.log("Wave finished");

    waveTxn = await waveContract.connect(randoPerson).wave("New message!");
    await waveTxn.wait();
    console.log("Wave finished");

    console.log("Get all waves");
    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);

    waveCount = await waveContract.getTotalWaves();
    console.log("wave count: %d", waveCount);
        
    console.log("getWavesForAddress");
    let wavesForAddress = await waveContract.getWavesForAddress(randoPerson.address);
    console.log("%s wave count: %d", randoPerson.address, wavesForAddress.length);

    console.log("getPointsForAddress");
    let pointsForAddress = await waveContract.getPointsForAddress(randoPerson.address);
    console.log("%s points: %d", randoPerson.address, pointsForAddress);
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
})