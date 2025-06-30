import { useContract } from './useContract';
import { useItemTrigger } from '@/context/ItemTriggerContext';
export const usePauseNFT = () => {
  const { contract } = useContract();
  const { incrementTrigger } = useItemTrigger();
  const pauseNFT = async () => {
    if (!contract) {
      return;
    }
    const tx = await contract.pause();
    console.log('tx', tx);
    incrementTrigger();
  };
  const unpauseNFT = async () => {
    if (!contract) {
      return;
    }
    const tx = await contract.unpause();
    console.log('tx', tx);
    incrementTrigger();
  };
  return {
     pauseNFT,
     unpauseNFT
   };
};
