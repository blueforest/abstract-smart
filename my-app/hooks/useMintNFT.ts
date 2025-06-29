import { useContract } from './useContract';
import { useState,useEffect } from 'react';
export const useMintNFT = () => {
  const { contract } = useContract();
  const [minting, setMinting] = useState(false);
  const [minted, setMinted] = useState(false);
  const [mintPrice, setMintPrice] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  useEffect(() => {
    if (contract) {
      contract.safeMint().then(setMintPrice);
      contract.maxSupply().then(setMaxSupply);
      contract.totalSupply().then(setTotalSupply);
    }
  }, [contract]);
  
};
