import {EAS} from "@ethereum-attestation-service/eas-sdk";
import {ethers} from "ethers";
import {EAS_CONTRACT_ADDRESS_SEPOLIA} from "@/config/config";

export const getEASClient = async (): Promise<EAS> => {
    console.log("Configuring EAS")

    const eas = new EAS(EAS_CONTRACT_ADDRESS_SEPOLIA);

    if (typeof window.ethereum === "undefined")
        throw new Error("No ethereum provider found");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    return eas.connect(signer);
}

export const getEASServer = async (): Promise<EAS> => {
    console.log("Configuring EAS")

    const eas = new EAS(EAS_CONTRACT_ADDRESS_SEPOLIA);
    const provider = new ethers.InfuraProvider("sepolia", process.env.INFURA_PROVIDER_ID, process.env.INFURA_PROVIDER_SECRET);

    // @ts-ignore
    return eas.connect(provider);
}