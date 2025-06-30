import { useContract } from './useContract';

export const usePauseNFT = () => {
  const { contract } = useContract();
  const pauseNFT = async () => {
    if (!contract) {
      return;
    }
    const tx = await contract.pause();
    console.log('tx', tx);
  };
  const unpauseNFT = async () => {
    if (!contract) {
      return;
    }
    const tx = await contract.unpause();
    console.log('tx', tx);
  };
  return {
     pauseNFT,
     unpauseNFT
   };
};
