async function main()
{
    const [owner, randoPerson] = await hre.ethers.getSigners();

    // Compile our contract and generate the necessary files we need to work with our contract under the artifacts directory
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");

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

    //let waveTxn = await waveContract.wave();
    let waveTxn = await waveContract.connect(randoPerson).wave();
    await waveTxn.wait();
    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randoPerson).wave();
    await waveTxn.wait();
    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(owner).wave();
    await waveTxn.wait();
    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(owner).wave();
    await waveTxn.wait();
    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(owner).wave();
    await waveTxn.wait();
    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(owner).wave();
    await waveTxn.wait();
    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(owner).wave();
    await waveTxn.wait();
    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(owner).wave();
    await waveTxn.wait();
    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(owner).wave();
    await waveTxn.wait();
    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(owner).wave();
    await waveTxn.wait();
    waveCount = await waveContract.getTotalWaves();

    
    
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
})