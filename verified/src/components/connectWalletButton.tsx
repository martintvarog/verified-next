import * as WalletService from "@/services/walletService";
import {useRouter, useSearchParams} from "next/navigation";
import {Button} from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Route } from "next";

export const useWalletConnectedRedirect = () => {
  const searchParams = useSearchParams();

  const redirect = searchParams.get('redirect') ?? '/createAttestation' satisfies Route;
  return redirect as Route;
}

type Props = {
  className?: string;
};

const ConnectWalletButton = ({ className }: Props) => {
  const router = useRouter();
  const walletConnectedRedirect = useWalletConnectedRedirect();

  const { mutate: connectWallet, isPending: walletConnecting } = useMutation({
    mutationFn: WalletService.connectWallet,
    onSuccess: () => {
      console.log('wallet connected');
      router.push(walletConnectedRedirect);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  })

  return (
      <Button
          onClick={() => { connectWallet() }}
          className={cn("px-4 py-2 text-lg", className)}
          loading={walletConnecting}
      >
        Connect Wallet
      </Button>
  );
};

export default ConnectWalletButton;