"use client"
import { useMintNFT } from "@/hooks/useMintNFT";
import { usePauseNFT } from "@/hooks/usePauseNFT";
export default function NFTActions() {
  const { mintNFT } = useMintNFT();
  // const { pauseNFT, unpauseNFT } = usePauseNFT();
  return   <section className="bg-white p-6 rounded-2xl shadow-md space-y-6">
    <h2 className="text-xl font-bold">⚙️ 功能操作</h2>

    
    <div>
      <h3 className="font-semibold mb-1">🆕 Mint NFT</h3>
      <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={mintNFT} >Mint 1 NFT</button>
    </div>

  
    <div>
      <h3 className="font-semibold mb-1">🔁 Transfer NFT</h3>
      <input type="text" placeholder="Token ID" id="transferTokenId" className="border p-2 mr-2 rounded" />
      <input type="text" placeholder="目标地址" id="transferTo" className="border p-2 mr-2 rounded w-1/2" />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" >Transfer</button>
    </div>


    <div>
      <h3 className="font-semibold mb-1">✅ Approve Token</h3>
      <input type="text" placeholder="Token ID" id="approveTokenId" className="border p-2 mr-2 rounded" />
      <input type="text" placeholder="授权地址" id="approveTo" className="border p-2 mr-2 rounded w-1/2" />
      <button className="bg-purple-500 text-white px-4 py-2 rounded" >Approve</button>
    </div>

    <div>
      <h3 className="font-semibold mb-1">🔥 Burn Token</h3>
      <input type="text" placeholder="Token ID" id="burnTokenId" className="border p-2 mr-2 rounded" />
      <button className="bg-red-500 text-white px-4 py-2 rounded" >Burn</button>
    </div>


    <div>
      <h3 className="font-semibold mb-1">🔍 查询 Token 信息</h3>
      <input type="text" placeholder="Token ID" id="queryTokenId" className="border p-2 mr-2 rounded" />
      <button className="bg-gray-800 text-white px-4 py-2 rounded" >查询</button>
      <div id="queryResult" className="mt-2 text-sm font-mono text-gray-600"></div>
    </div>
  </section>;
}