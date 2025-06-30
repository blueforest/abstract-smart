import { ethers } from "ethers";
import { useContract } from './useContract';
import { useWallet } from './useWallet';
import { useItemTrigger } from '@/context/ItemTriggerContext';
export const useMintNFT = () => {
  const { contract,
     contractMaxSupply,
      contractPrice,
      contractTotalSupply,
      contractPaused,
      isOwner,
      provider
     } = useContract();
  const { incrementTrigger } = useItemTrigger();
  const { account } = useWallet();
  const  mintNFT = async () => {
    if (!contract || !provider) {
      return;
    }
    if (contractMaxSupply === 0) {
      throw new Error('合约最大铸造数量为0');
      // return;
    }
    if (contractTotalSupply >= contractMaxSupply) {
      throw new Error('铸造数量超过最大铸造数量');
      // return;
    }
    if (contractPaused) {
      throw new Error('合约已暂停');
      // return;
    }
    if (!contractPrice) {
      throw new Error('合约价格未设置');
    }
    if (isOwner) {
      const tx = await contract.safeMint({
        value: ethers.parseEther((Number(contractPrice) * 1.1).toString())
      });
      console.log('tx', tx);
      incrementTrigger();
    } else {
      if (!account) {
        throw new Error('请先连接钱包');
      }
      const signer = await provider.getSigner(account);
      const tx = await contract.connect(signer).safeMint({
        value: ethers.parseEther((Number(contractPrice) * 1.1).toString())
      });
      console.log('tx', tx);
      incrementTrigger();
    }
  };
  return {
    mintNFT
  }
};
