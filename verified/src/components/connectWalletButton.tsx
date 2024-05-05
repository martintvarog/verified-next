import WalletService from "@/services/walletService";
import {useRouter} from "next/navigation";


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
            <button onClick={connectWallet}>Connect Wallet</button>
        </div>

    );
};

export default ConnectWalletButton;
