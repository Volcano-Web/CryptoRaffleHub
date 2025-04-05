
import { useContract, useContractRead } from "@thirdweb-dev/react";
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;
export default function Participants() {
  const { contract } = useContract(contractAddress);
  const { data: players, isLoading } = useContractRead(contract, "getPlayers");
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">👥 Participants:</h2>
      {isLoading ? (
        <p className="text-sm text-zinc-400">Loading...</p>
      ) : (
        <ul className="space-y-1 text-sm">
          {(players as string[])?.length === 0 && (
            <li className="text-zinc-400 italic">No participants yet.</li>
          )}
          {(players as string[])?.map((p, i) => (
            <li key={i} className="text-zinc-300">
              - {p.slice(0, 6)}...{p.slice(-4)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
