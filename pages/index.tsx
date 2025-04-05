import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Head from "next/head";
import PrizePool from "../components/PrizePool";
import TicketCounter from "../components/TicketCounter";
import Participants from "../components/Participants";
import BuyTicket from "../components/BuyTicket";
import DrawWinner from "../components/DrawWinner";

export default function Home() {
  const address = useAddress();

  return (
    <>
      <Head>
        <title>CryptoRaffleHub</title>
        <meta name="description" content="Decentralized USDT raffle on Polygon" />
      </Head>

      <main className="min-h-screen bg-zinc-900 text-white p-6 flex flex-col items-center">
        <div className="w-full max-w-2xl space-y-6">
          <h1 className="text-3xl font-bold text-center">🎟 CryptoRaffleHub</h1>
          <div className="flex justify-center">
            <ConnectWallet />
          </div>

          <div className="bg-zinc-800 rounded-2xl p-6 shadow-lg space-y-4">
            <PrizePool />
            <TicketCounter />
            <Participants />
            <BuyTicket />
            <DrawWinner userAddress={address} />
          </div>
        </div>
      </main>
    </>
  );
}
