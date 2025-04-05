import { useAddress, useContract, useContractWrite } from "@thirdweb-dev/react";
import { useState } from "react";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;

export default function BuyTicket() {
  const address = useAddress();
  const { contract } = useContract(contractAddress);
  const { mutateAsync: buyTicket, isLoading } = useContractWrite(contract, "buyTicket");
  const [error, setError] = useState("");

  const handleBuy = async () => {
    if (!address || !buyTicket) return;
    setError("");

    try {
      await buyTicket([]);
      alert("🎉 Ticket purchased!");
    } catch (err) {
      console.error("Buy failed:", err);
      setError("Transaction failed. Please try again.");
    }
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleBuy}
        disabled={!address || isLoading}
        className="w-full bg-green-600 hover:bg-green-700 py-2 px-4 rounded-xl font-semibold disabled:opacity-50"
      >
        {isLoading ? "Processing..." : "Buy Ticket (5 USDT)"}
      </button>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
