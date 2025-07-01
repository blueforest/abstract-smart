import { useEffect, useState } from 'react';
import { ethers, Contract, Signer, JsonRpcProvider,BrowserProvider } from 'ethers';
import MyToken from '@/constants/abi.json';
import { useItemTrigger } from '@/context/ItemTriggerContext';
import { useWallet } from './useWallet';
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;
export const useContract = () => {
  const { trigger } = useItemTrigger();
  const { account } = useWallet();
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [contractMaxSupply, setContractMaxSupply] = useState<number>(0);
  const [contractPrice, setContractPrice] = useState<string | null>(null);
  const [contractTotalSupply, setContractTotalSupply] = useState<number>(0);
  const [contractPaused, setContractPaused] = useState<boolean>(false);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  useEffect(() => {
    const initContract = async () => {
      // if (!contractAddress || !rpcUrl) {
      //   throw new Error ('Contract address or RPC URL is not set');
      // }
      // const provider = new JsonRpcProvider(rpcUrl);

      if (!window.ethereum) throw new Error("MetaMask not found");
      const browserProvider = new BrowserProvider(window.ethereum);
      const signer = await browserProvider.getSigner();
      setProvider(browserProvider);

      const contract = new Contract(contractAddress!, MyToken.abi, signer);
      setContract(contract);
      // 合约中定的 常量 例如 use256 public _price = 0.001 ether;
      // soliditi会自动生成一个getter方法  _price()
      const suply = await contract._maxSupply();
      setContractMaxSupply(Number(suply));
      const price = await contract._price();
      setContractPrice(ethers.formatEther(price));
      // 获取当前已铸造的数量
      const totalSupply = await contract.totalSupply();
      setContractTotalSupply(Number(totalSupply));
      // 获取当前是否暂停
      const paused = await contract.paused();
      setContractPaused(paused);
      // 获取当前合约的owner
      const owner = await contract.owner();
      console.log('owner', owner);
      // setContractOwner(owner);
      // 判断当前用户是否是合约的owner
      if (account && owner.toLowerCase() === account.toLowerCase()) {
        setIsOwner(true);
      }
    };
    initContract();
  }, [trigger, account]);

  return { 
    contract,
    contractAddress,
    contractMaxSupply,
    contractPrice,
    contractTotalSupply,
    contractPaused,
    provider,
    isOwner
   };
};

