import { useContract, useContractRead } from "@thirdweb-dev/react";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;

export default function TicketCounter() {
  const { contract } = useContract(contractAddress);
  const { data, isLoading } = useContractRead(contract, "getNumberOfTickets");

  return (
    <div className="text-lg">
      🎟 Tickets Sold:{" "}
      <span className="font-semibold">
        {isLoading ? "Loading..." : data?.toString()}
      </span>
    </div>
  );
}
