import { useQuery } from "@tanstack/react-query";
import * as WalletService from "@/services/walletService";
import { redirect, usePathname } from "next/navigation"

type Props = {
  require?: boolean;
}

export const useWalletConnected = ({ require }: Props = { require: true }) => {
   const { data: isWalletConnected  } = useQuery({
    queryKey: ["isWalletConnected"],
    queryFn: () => WalletService.isWalletConnected(),
  });
  const pathname = usePathname();
  if (isWalletConnected === false && require) return redirect(`/connectWallet?redirect=${pathname}`);
  return isWalletConnected;
}
