import { useItemTrigger } from "@/context/ItemTriggerContext";
import { useContract } from "./useContract";
import { useWallet } from "./useWallet";

export const useWithDraw = () => {
  const { contract, provider,isOwner } = useContract();
  const { account } = useWallet();
  const { incrementTrigger } = useItemTrigger();

  const withDraw = async () => {
    if (!account) {
      throw new Error('请先连接钱包');
    }
    if (!contract) {
      throw new Error('合约未连接');
    }
    const signer = await provider?.getSigner(account);
    if (!signer) {
      throw new Error('请先连接钱包');
    }
    if(!isOwner){
      throw new Error('当前账户没有权限');
    }
    const tx = await contract.connect(signer).withdraw();
    incrementTrigger();
    return tx;
  };
  return {
    withDraw
  };
};