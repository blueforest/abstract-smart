import { useContract } from './useContract';
import { useNFTGallery } from './useNFTGallery';
import { useWallet } from './useWallet';
import { useItemTrigger } from '@/context/ItemTriggerContext';
export const useNftBurn = () => {
  const { contract,provider } = useContract();
  const { nftGallery } = useNFTGallery();
  const { incrementTrigger } = useItemTrigger();
  const { account } = useWallet();
  const burnNft = async (tokenId: number) => {
    if (!contract) {
      throw new Error('合约未连接');
    }
    if (!account) {
      throw new Error('请先连接钱包');
    }
    const signer = await provider?.getSigner(account);
    const _nftGallery = nftGallery.map((item: any) => Number(item));
    if (!_nftGallery.includes(tokenId)) {
      throw new Error('当前账户没有该NFT');
    }
    if(signer){
      const tx = await contract.connect(signer).burn(tokenId);
      incrementTrigger();
      return tx;
    }
    return null;
  };
  return {
    burnNft
  }
};