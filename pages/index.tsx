
import { useAddress, useContract, useContractRead, useContractWrite, ConnectWallet } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;

export default function Home() {
  const address = useAddress();
  const { contract } = useContract(contractAddress);
  const { data: prizePool } = useContractRead(contract, "getPrizePool");
  const { data: ticketCount } = useContractRead(contract, "getNumberOfTickets");
  const { data: participants } = useContractRead(contract, "getPlayers");
  const { mutateAsync: buyTicket, isLoading: isBuying } = useContractWrite(contract, "buyTicket");
  const { mutateAsync: drawWinner, isLoading: isDrawing } = useContractWrite(contract, "drawWinner");
  const [owner, setOwner] = useState<string | null>(null);

  useEffect(() => {
    const getOwner = async () => {
      if (!contract) return;
      const result = await contract.call("owner");
      setOwner(result);
    };
    getOwner();
  }, [contract]);

  const handleBuyTicket = async () => {
    try {
      await buyTicket([]);
      alert("Ticket purchased!");
    } catch (err) {
      console.error(err);
      alert("Transaction failed.");
    }
  };

  const handleDrawWinner = async () => {
    try {
      await drawWinner([]);
      alert("Winner drawn!");
    } catch (err) {
      console.error(err);
      alert("Draw failed.");
    }
  };

  return (
    <main className="min-h-screen bg-zinc-900 text-white flex flex-col items-center p-8">
      <div className="w-full max-w-2xl space-y-6">
        <h1 className="text-3xl font-bold text-center">🎟 CryptoRaffleHub</h1>
        <ConnectWallet />

        <div className="bg-zinc-800 rounded-2xl p-6 shadow-xl space-y-4 mt-6">
          <div className="text-lg">🎁 Prize Pool: <span className="font-semibold">{prizePool?.toString() || "..."}</span> USDT</div>
          <div className="text-lg">🎟 Tickets Sold: <span className="font-semibold">{ticketCount?.toString() || "..."}</span></div>

          <button
            onClick={handleBuyTicket}
            disabled={!address || isBuying}
            className="w-full bg-green-600 hover:bg-green-700 py-2 px-4 rounded-xl font-semibold disabled:opacity-50"
          >
            {isBuying ? "Processing..." : "Buy Ticket (5 USDT)"}
          </button>

          {address === owner && (
            <button
              onClick={handleDrawWinner}
              disabled={isDrawing}
              className="w-full bg-orange-600 hover:bg-orange-700 py-2 px-4 rounded-xl font-semibold disabled:opacity-50"
            >
              {isDrawing ? "Drawing..." : "Draw Winner"}
            </button>
          )}

          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">👥 Participants:</h2>
            <ul className="space-y-1 text-sm">
              {participants?.map((p: string, idx: number) => (
                <li key={idx} className="text-zinc-300">- {p.slice(0, 6)}...{p.slice(-4)}</li>
              )) || <li>Loading...</li>}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
