import {EAS} from "@ethereum-attestation-service/eas-sdk";
import {ethers} from "ethers";
import {EAS_CONTRACT_ADDRESS_SEPOLIA} from "@/config/config";

const configureEAS = async (isSignerNeeded: boolean): Promise<EAS> => {

    console.log("Configuring EAS")

    const eas = new EAS(EAS_CONTRACT_ADDRESS_SEPOLIA);

    if (isSignerNeeded && typeof window.ethereum !== "undefined") {

        const provider = new ethers.BrowserProvider(window.ethereum);

        const signer = await provider.getSigner();

        eas.connect(signer);

        return eas;
    }

    const provider = new ethers.InfuraProvider("sepolia", process.env.INFURA_PROVIDER_ID, process.env.INFURA_PROVIDER_SECRET);

    // @ts-ignore
    eas.connect(provider);

    return eas;

}

const ConfiguredEAS = {
    configureEAS
}

export {ConfiguredEAS}