
import { useContract, useContractRead } from "@thirdweb-dev/react";
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;
export default function PrizePool() {
  const { contract } = useContract(contractAddress);
  const { data, isLoading } = useContractRead(contract, "getPrizePool");
  return (
    <div className="text-lg">
      🎁 Prize Pool:{" "}
      <span className="font-semibold">
        {isLoading ? "Loading..." : \`\${data?.toString()} USDT\`}
      </span>
    </div>
  );
}
