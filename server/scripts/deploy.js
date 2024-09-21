const { ethers } = require("hardhat");

async function main() {
    const Box = await ethers.getContractFactory("SupplyChain");
    console.log("Deploying SupplyChain...");
    

    const box = await Box.deploy();
    

    await box.waitForDeployment();
    
    console.log("SupplyChain deployed to:", box.target);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
