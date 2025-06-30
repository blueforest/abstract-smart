import { useContract } from './useContract';
import { useState,useEffect } from 'react';
export const useMintNFT = () => {
  const { contract,
     contractMaxSupply,
      contractPrice,
      contractTotalSupply,
      contractPaused
     } = useContract();
  const  mintNFT = async () => {
    if (!contract) {
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
    const tx = await contract.safeMint();
    console.log('tx', tx);
  };
  
};
