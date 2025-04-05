
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;
interface Props {
  userAddress: string | undefined;
}
export default function DrawWinner({ userAddress }: Props) {
  const { contract } = useContract(contractAddress);
  const [owner, setOwner] = useState<string | null>(null);
  const { mutateAsync: drawWinner, isLoading } = useContractWrite(contract, "drawWinner");
  useEffect(() => {
    const fetchOwner = async () => {
      if (!contract) return;
      const result = await contract.call("owner");
      setOwner(result);
    };
    fetchOwner();
  }, [contract]);
  const handleDraw = async () => {
    try {
      await drawWinner([]);
      alert("🎯 Winner drawn!");
    } catch (err) {
      console.error("Draw failed:", err);
      alert("Draw failed.");
    }
  };
  if (!userAddress || owner?.toLowerCase() !== userAddress.toLowerCase()) return null;
  return (
    <button
      onClick={handleDraw}
      disabled={isLoading}
      className="w-full bg-orange-600 hover:bg-orange-700 py-2 px-4 rounded-xl font-semibold disabled:opacity-50 mt-4"
    >
      {isLoading ? "Drawing..." : "🎯 Draw Winner"}
    </button>
  );
}
