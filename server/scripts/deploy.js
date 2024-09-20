const { ethers } = require("hardhat");

async function main() {
    const SupplyChain = await ethers.getContractFactory("SupplyChain");

    const supplychain = await SupplyChain.deploy();


    await supplychain.deployed();

    console.log("SupplyChain deployed to: ", supplychain.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });       