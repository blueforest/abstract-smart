import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
// solidity-coverage 用于测试覆盖率
// 在命令行工具中运行：npx hardhat coverage
import "solidity-coverage";
const config: HardhatUserConfig = {
  solidity: "0.8.28",
  namedAccounts: {
    // 这里必须要加namedAccounts，否则在deploy的时候会报错
    // 因为 getNamedAccounts 会根据namedAccounts的配置来获取部署账户
    // 如果配置了namedAccounts，则getNamedAccounts会返回namedAccounts的配置
    deployer: {
      default: 0,
    },
    user: {
      default: 1,
    },
    user2: {
      default: 2,
    },
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
  },
  // gasReporter 是否在命令行工具显示gas使用情况
  gasReporter: {
    enabled: false,
    // currency: "USD",
    // gasPrice: 100,
    // gasLimit: 1000000,
  },
};

export default config;
