"use client"
import { useNFTGallery } from "@/hooks/useNFTGallery";
export default function MyNFTGallery() {
  const { nftGallery } = useNFTGallery();

  const ipfsCid = process.env.NEXT_PUBLIC_IPFS_CID;
  const ipfsGatewayUrl = process.env.NEXT_PUBLIC_GATEWAY_URL;
  const tokenUrl =  `https://${ipfsGatewayUrl}/ipfs/${ipfsCid}`;
  return   <section className="bg-white p-6 rounded-2xl shadow-md mb-6">
    <h2 className="text-xl font-bold mb-4">🎨 我的 NFT</h2>
    <div  className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* JS 动态插入 NFT 卡片 */}
      {nftGallery.map((nft) => (
      <div className="border p-2 rounded-lg shadow"
        key={nft}
      >
        <img src={`${tokenUrl}/${nft}.png`} alt="nft" className="w-full rounded" />
        <div className="mt-2 text-sm">Token ID: {nft}</div>
        <button className="mt-2 w-full bg-blue-500 text-white py-1 rounded">Transfer</button>
      </div>
      ))}
    </div>
  </section>;
}