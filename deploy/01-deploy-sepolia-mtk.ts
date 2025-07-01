async function deployMyToken({
  getNamedAccounts,
  deployments,
  ethers
}: {
  getNamedAccounts: any;
  deployments: any;
  ethers: any;
}) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  console.log("Deploying Mytoken contract with the owner:", deployer);
  // from参数指定了部署合约的账户地址
  // 这里使用deployer账户作为部署者
  // deployer是通过getNamedAccounts()获取的默认部署账户
  const tokenURI =
    "ipfs://bafybeieobobkdrxjywhkinpsmwskpnmaz4i4polnl7ck6cofrxzb2sqeu1";
  const myToken = await deploy("MyToken", {
    from: deployer,
    args: [tokenURI],
    log: true,
  });
  // 获取合约的部署地址
  console.log("Mytoken deployed to:", myToken.address);
}

export default deployMyToken;
// npx hardhat deploy --tags MyToken --network hardhat
deployMyToken.tags = ["MyToken"];
