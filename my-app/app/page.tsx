
import ContractInfo from "@/components/ContractInfo";
import AdminPanel from "@/components/AdminPanel";
import NFTActions from "@/components/NFTActions";
import MyNFTGallery from "@/components/MyNFTGallery";
import { ItemTriggerProvider } from "@/context/ItemTriggerContext";
export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <ItemTriggerProvider>
        <ContractInfo />
        <MyNFTGallery />
        <NFTActions />
        <AdminPanel />
      </ItemTriggerProvider>
    </main>
  );
}
