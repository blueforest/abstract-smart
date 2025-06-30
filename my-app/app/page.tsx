
import ContractInfo from "@/components/ContractInfo";
import AdminPanel from "@/components/AdminPanel";
import NFTActions from "@/components/NFTActions";
import MyNFTGallery from "@/components/MyNFTGallery";
export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <ContractInfo />
      <MyNFTGallery />
      <NFTActions />
      <AdminPanel />
    </main>
  );
}
