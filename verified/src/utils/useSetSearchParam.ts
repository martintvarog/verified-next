import * as WalletService from "@/services/walletService";
import { redirect, usePathname } from "next/navigation"

type Props = {
  require?: boolean;
}

export const useWalletConnected = ({ require }: Props = { require: true }) => {
  const isWalletConnected  = WalletService.isWalletConnected();
  const pathname = usePathname();
  if (isWalletConnected === false && require) return redirect(`/connectWallet?redirect=${pathname}`);
  return isWalletConnected;
}