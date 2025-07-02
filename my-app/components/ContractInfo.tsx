"use client";
import { useContract } from '@/hooks/useContract';
import { useWallet } from '@/hooks/useWallet';
// import { useEffect, useState } from 'react';

export default function ContractInfo() {
  const {
    contractAddress,
     contractMaxSupply,
     contractPrice,
     contractTotalSupply,
     contractPaused
     } = useContract();
  const { account } = useWallet();
  return   <section className ="bg-white p-6 rounded-2xl shadow-md mb-6">
    <h1 className="text-2xl font-bold mb-4">🎯 合约信息</h1>
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div>合约地址: <span id="contractAddress" className="font-mono text-blue-600">{contractAddress}</span></div>
      <div>当前用户: <span id="userAddress" className="font-mono text-green-600">{account}</span></div>
      <div>铸造价格: <span id="mintPrice">{contractPrice} ETH</span></div>
      <div>最大供应量: <span id="maxSupply">{contractMaxSupply}</span></div>
      <div>当前已铸: <span id="totalSupply">{contractTotalSupply}</span></div>

        <div>状态: <span id="paused" className="font-bold text-green-500">
          {contractPaused ? '❌ 暂停' : '✅ 正常'}
          </span></div>
      
    </div>
  </section>;
}
