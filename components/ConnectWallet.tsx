
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
export default function WalletConnect() {
  const address = useAddress();
  return (
    <div className="flex items-center justify-center gap-4">
      {address ? (
        <div className="text-sm text-green-400 font-mono">
          ✅ Connected: {address.slice(0, 6)}...{address.slice(-4)}
        </div>
      ) : (
        <div className="text-sm text-zinc-400">Connect your wallet to begin</div>
      )}
      <ConnectWallet
        btnTitle="Connect Wallet"
        modalTitle="Connect Your Wallet"
        theme="dark"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm"
      />
    </div>
  );
}
