"use client";
export default function AdminPanel() {
  const pauseContract = () => {
    console.log("暂停合约");
  };
  const unpauseContract = () => {
    console.log("恢复合约");
  };
  const withdraw = () => {
    console.log("提现");
  };
  return   <section className="bg-yellow-50 p-6 rounded-2xl shadow-md mt-6">
    <h2 className="text-xl font-bold mb-4">🔐 管理员功能</h2>
    <div className="space-x-2">
      <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={pauseContract}>⏸ 暂停合约</button>
      <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={unpauseContract}>▶️ 恢复合约</button>
      <button className="bg-gray-700 text-white px-4 py-2 rounded" onClick={withdraw}>💰 提现</button>
    </div>
  </section>;
}
