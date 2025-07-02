import { useContract } from "./useContract";
import { useItemTrigger } from "@/context/ItemTriggerContext";
import { useWallet } from "./useWallet";
import { useNFTGallery } from "./useNFTGallery";
export const useApproveNFT = () => {
  const { contract,provider } = useContract();
  const { account } = useWallet();
  const { incrementTrigger } = useItemTrigger();
  const { nftGallery } = useNFTGallery();
  const approveNFT = async (tokenId: number, to: string) => {
    if (!contract) {
      throw new Error('合约未连接');
    }
    if (!account) {
      throw new Error('请先连接钱包');
    }
    // const _nftGallery = nftGallery.map((item: any) => Number(item));
    // if (!_nftGallery.includes(tokenId)) {
    //   throw new Error('当前账户没有该NFT');
    // }
    const signer = await provider?.getSigner(account);
    if (signer) {
      const tx = await (contract as any).connect(signer)
      .approve(to, tokenId);
      incrementTrigger();
      return tx;
    }
    return null;
  };
  return {
    approveNFT
  }
};
