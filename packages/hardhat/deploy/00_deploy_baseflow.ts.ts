import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  // 1) Resolver tokenAddress: .env o mock
  let tokenAddress = process.env.USDC_ADDRESS;
  if (!tokenAddress || tokenAddress === "" || tokenAddress === "0x0000000000000000000000000000000000000000") {
    const mock = await deploy("MockUSDC", {
      from: deployer,
      args: ["Mock USDC", "USDC"],
      log: true,
      autoMine: true,
    });
    tokenAddress = mock.address;
    log(`MockUSDC deployed at ${mock.address}`);
  } else {
    log(`Using provided USDC_ADDRESS: ${tokenAddress}`);
  }

  // 2) Deploy BaseFlowImplementation(tokenAddress)
  const impl = await deploy("BaseFlowImplementation", {
    from: deployer,
    args: [tokenAddress],
    log: true,
    autoMine: true,
  });
  log(`BaseFlowImplementation deployed at ${impl.address}`);
};

export default func;
func.tags = ["BaseFlow"];
