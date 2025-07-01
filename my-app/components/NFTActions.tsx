"use client"
import { useMintNFT } from "@/hooks/useMintNFT";
import { useTransferNFT } from "@/hooks/useTransferNFT";
import { useState } from 'react';
import { useNftBurn } from "@/hooks/useNftBurn";
import { useApproveNFT } from "@/hooks/useApproveNFT";
export default function NFTActions() {
  const { mintNFT } = useMintNFT();
  const { transferNFT } = useTransferNFT();
  const { burnNft } = useNftBurn();
  const { approveNFT } = useApproveNFT();
  const [tokenId, setTokenId] = useState<string>('');
  const [burnTokenId, setBurnTokenId] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [approveTokenId, setApproveTokenId] = useState<string>('');
  const [approveTo, setApproveTo] = useState<string>('');
  return   <section className="bg-white p-6 rounded-2xl shadow-md space-y-6">
    <h2 className="text-xl font-bold">⚙️ 功能操作</h2>

    
    <div>
      <h3 className="font-semibold mb-1">🆕 Mint NFT</h3>
      <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={mintNFT} >Mint 1 NFT</button>
    </div>

  
    <div>
      <h3 className="font-semibold mb-1">🔁 Transfer NFT</h3>
      <input value={tokenId} onChange={(e) => setTokenId(e.target.value)} type="text" placeholder="Token ID" id="transferTokenId" className="border p-2 mr-2 rounded" />
      <input value={to} onChange={(e) => setTo(e.target.value)} type="text" placeholder="目标地址" id="transferTo" className="border p-2 mr-2 rounded w-1/2" />
      <button 
      className="bg-blue-500 text-white px-4 py-2 rounded" 
      onClick={() => transferNFT(to, Number(tokenId))} >
        Transfer</button>
    </div>


    <div>
      <h3 className="font-semibold mb-1">✅ Approve Token</h3>
      <input 
      value={approveTokenId} 
      onChange={(e) => setApproveTokenId(e.target.value)}
      type="text" 
      placeholder="Token ID" 
      className="border p-2 mr-2 rounded" />
      <input 
      value={approveTo} 
      onChange={(e) => setApproveTo(e.target.value)}
      type="text" 
      placeholder="授权地址" 
      className="border p-2 mr-2 rounded w-1/2" />
      <button className="bg-purple-500 text-white px-4 py-2 rounded" 
      onClick={() => approveNFT(Number(approveTokenId), approveTo)} >Approve</button>
    </div>

    <div>
      <h3 className="font-semibold mb-1">🔥 Burn Token</h3>
      <input 
      value={burnTokenId} 
      onChange={(e) => setBurnTokenId(e.target.value)}
      type="text"
      placeholder="Token ID" 
      className="border p-2 mr-2 rounded" />
      <button className="bg-red-500 text-white px-4 py-2 rounded"
      onClick={() => burnNft(Number(burnTokenId))} >Burn</button>
    </div>


    <div>
      <h3 className="font-semibold mb-1">🔍 查询 Token 信息</h3>
      <input type="text" placeholder="Token ID" id="queryTokenId" className="border p-2 mr-2 rounded" />
      <button className="bg-gray-800 text-white px-4 py-2 rounded" >查询</button>
      <div id="queryResult" className="mt-2 text-sm font-mono text-gray-600"></div>
    </div>
  </section>;
}