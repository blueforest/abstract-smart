import { useContract } from './useContract';
import { useNFTGallery } from './useNFTGallery';
import { useWallet } from './useWallet';
import { useItemTrigger } from '@/context/ItemTriggerContext';
export const useTransferNFT = () => {
  const { contract,isOwner,provider } = useContract();
  const { nftGallery } = useNFTGallery();
  const { account } = useWallet();
  const { incrementTrigger } = useItemTrigger();
  const transferNFT = async (to: string, tokenId: number) => {
    if (!contract) {
      throw new Error('合约未连接');
    }
    // 查询当前账户的token
    if (nftGallery.length === 0) {
      throw new Error('当前账户没有NFT');
    }

    const _nftGallery = nftGallery.map((item: any) => Number(item));
    console.log('nftGallery', _nftGallery);
    console.log('tokenId', tokenId);
    if (!_nftGallery.includes(tokenId)) {
      throw new Error('当前账户没有该NFT');
    }
  
    if (!account) {
      throw new Error('请先连接钱包');
    }
    const signer = await provider?.getSigner(account);
    if (!signer) {
      throw new Error('请先连接钱包');
    }
    const tx = await contract.connect(signer)
    .safeTransferFrom(account, to, tokenId);
    incrementTrigger();
    return tx;
    
  };
  return {
    transferNFT
  }
};
