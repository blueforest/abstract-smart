export default function MyNFTGallery() {
  return   <section className="bg-white p-6 rounded-2xl shadow-md mb-6">
    <h2 className="text-xl font-bold mb-4">🎨 我的 NFT</h2>
    <div id="nftGallery" className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* JS 动态插入 NFT 卡片 */}
    
      <div className="border p-2 rounded-lg shadow">
        <img src="ipfs://xxx.png" alt="nft" className="w-full rounded" />
        <div className="mt-2 text-sm">Token ID: 1</div>
        <button className="mt-2 w-full bg-blue-500 text-white py-1 rounded">Transfer</button>
      </div>
      
    </div>
  </section>;
}