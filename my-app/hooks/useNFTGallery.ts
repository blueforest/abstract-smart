import { useContract } from "./useContract";
import {useWallet} from "./useWallet"
import {useEffect,useState} from 'react'
import {useItemTrigger} from "@/context/ItemTriggerContext"

export const useNFTGallery = () => {
  const { contract } = useContract();
  const { account } = useWallet();
  const [nftGallery, setNftGallery] = useState<any[]>([]);
  const { trigger } = useItemTrigger();
  useEffect(() => {
    const fetchNFTGallery = async () => {
      if (!contract) return;
      if (!account) return;
      const nftGallery = await contract.tokensOfOwner(account);
      setNftGallery(nftGallery);
    }
    console.log('nftGallery', nftGallery);
    fetchNFTGallery();
  }, [contract, account,trigger]);
  return {
    nftGallery
  }
};
