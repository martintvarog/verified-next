import WalletService from "@/services/walletService";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";


const ConnectWalletButton = () => {

   const router = useRouter();

    const connectWallet = async () => {
        console.log('verifying wallet');
        await WalletService.connectWallet().then((connected) => {
            console.log('wallet is: ', connected);
            if (connected) {
                router.push('/createAttestation?isWalletConnected=true');
            }
        });
    };

    return (
        <div>
            <Button onClick={connectWallet} className="px-4 py-2 text-lg">Connect Wallet</Button>
        </div>

    );
};

export default ConnectWalletButton;
