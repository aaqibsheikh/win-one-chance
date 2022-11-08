const {ethers} = require("hardhat")
require("dotenv").config({path: '.env'})

const { FEE, VRF_COORDINATOR, LINK_TOKEN, KEY_HASH } = require("../constants")

async function main() {
  const winOneChance = await ethers.getContractFactory("WinOneChance");
  const deployedWinOneChance = await winOneChance.deploy(VRF_COORDINATOR, LINK_TOKEN, KEY_HASH, FEE);

  await deployedWinOneChance.deployed();

  console.log("Verify Contract Address", deployedWinOneChance.address)

  console.log("Sleeping....");
  // Wait for etherscan to notice that the contract has been deployed
  await sleep(30000)

  // verify the contract after deploying

  await hre.run("verify:verify", {address: deployedWinOneChance.address, constructorArguments: [VRF_COORDINATOR, LINK_TOKEN, KEY_HASH, FEE]})

}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });