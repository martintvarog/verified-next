'use client'
import ConnectWalletButton, { useWalletConnectedRedirect } from "@/components/connectWalletButton";
import { useWalletConnected } from "@/utils/useWalletConnected";
import { redirect } from "next/navigation";

const ConnectWalletPage = () => {
  const isWalletConnected = useWalletConnected({ require: false });

  const walletConnectedRedirect = useWalletConnectedRedirect();
  if (isWalletConnected) return redirect(walletConnectedRedirect);

  return (
      <div className="flex flex-col items-center">
        <ConnectWalletButton />
      </div>
  );
};

export default ConnectWalletPage;