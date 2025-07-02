import { useContract } from './useContract';
// import { useNFTGallery } from './useNFTGallery';
import { useWallet } from './useWallet';
import { ethers } from 'ethers';
import { useItemTrigger } from '@/context/ItemTriggerContext';
export const useTransferNFT = () => {
  const { contract,provider } = useContract();
 
  const { account } = useWallet();

  const { incrementTrigger } = useItemTrigger();
  const transferNFT = async (to: string, tokenId: number) => {
    try{
      if (!contract) {
        throw new Error('合约未连接');
      }
            
      if (!account) {
        throw new Error('请先连接钱包');
      }

      const signer = await provider?.getSigner(account);
        if (!signer) {
          throw new Error('请先连接钱包');
      }
      // 查询tokenId是否被授权
      const approvedAddress = await contract.getApproved(tokenId);
      console.log('approvedAddress', approvedAddress);
      
       // 查询tokenId是否属于当前账户
      const ownerAddress = await contract.ownerOf(tokenId);

      // 如果approvedAddress没有被授权过
      if (approvedAddress === ethers.ZeroAddress) {
        // 判断tokenId是否属于当前账户
        if(ownerAddress !== account){
          throw new Error('当前账户没有权限');
          return
        }
        const tx = await (contract as any).connect(signer)
        .safeTransferFrom(account, to, tokenId);
        incrementTrigger();
        return tx;
      } else {
        // 判断approvedAddress是否属于当前账户
        if(approvedAddress !== account){
          throw new Error('当前账户没有权限');
        }
        const tx = await (contract as any).connect(signer)
        .safeTransferFrom(ownerAddress, to, tokenId);
        incrementTrigger();
        return tx;
      }
     


    }catch(error:any){
      let message = error.message;
      console.log('message', message);
      let msgMap = {
        "ERC721OutOfBoundsIndex": "不存在NFT",
        "ERC721NonexistentToken": "当前账户没有NFT",
      }
      Object.keys(msgMap).forEach(key => {
        if (message.includes(key)) {
          throw new Error(msgMap[key as keyof typeof msgMap]);
        }
      });
      throw new Error('转账失败');

    }
    
  };
  return {
    transferNFT
  }
};
