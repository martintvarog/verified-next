import WalletService from "@/services/walletService";
import {useRouter} from "next/navigation";


const ConnectWalletButton = () => {

   const router = useRouter();

    const connectWallet = async () => {
        const connected = await WalletService.connectWallet();
        if (connected) {
            router.push('/createAttestation');
        }
    };

    return (
        <div>
            <button onClick={connectWallet}>Connect Wallet</button>
        </div>

    );
};

export default ConnectWalletButton;
