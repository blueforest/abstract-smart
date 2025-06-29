import { useEffect, useState } from 'react';
import { ethers, Contract, Signer, JsonRpcProvider } from 'ethers';
import MyToken from '@/constants/abi.json';

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

// 必须执行 npx hardhat node
// rpcUrl 是 http://127.0.0.1:8545
const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;

export const useContract = () => {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [contractMaxSupply, setContractMaxSupply] = useState<number | null>(null);
  const [contractPrice, setContractPrice] = useState<string | null>(null);
  useEffect(() => {
    const initContract = async () => {
      if (!contractAddress || !rpcUrl) {
        throw new Error ('Contract address or RPC URL is not set');
      }
      const provider = new JsonRpcProvider(rpcUrl);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, MyToken.abi, signer);
      setContract(contract);
      // 合约中定的 常量 例如 use256 public _price = 0.001 ether;
      // soliditi会自动生成一个getter方法  _price()
      const suply = await contract._maxSupply();
      setContractMaxSupply(Number(suply));
      const price = await contract._price();
      setContractPrice(ethers.formatEther(price));
    };
    initContract();
  }, []);

  return { 
    contract,
    contractAddress,
    contractMaxSupply,
    contractPrice
   };
};

