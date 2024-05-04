import {Attestation, EAS, SchemaDecodedItem, SchemaEncoder} from "@ethereum-attestation-service/eas-sdk";
import {EAS_CONTRACT_ADDRESS_SEPOLIA, SCHEMA, SCHEMA_UID} from "@/config/config";
import {AttestationData, AttestationDataView} from "@/types/attestationData";
import {ethers} from "ethers";


const Schema = "string University_Name, string Faculty_Name, string Programme_Name, string Type_Name, string Mode_Name, string Academic_Year, string File_Hash";

const createAttestation = async (attestationData: AttestationData): Promise<string> => {
    const eas: EAS = await configureEAS(true);

    // Initialize SchemaEncoder with the schema string
    const schemaEncoder = new SchemaEncoder(SCHEMA);
    const encodedData = schemaEncoder.encodeData([
        {name: "University_Name", value: attestationData.universityName, type: "string"},
        {name: "Faculty_Name", value: attestationData.facultyName, type: "string"},
        {name: "Programme_Name", value: attestationData.programmeName, type: "string"},
        {name: "Type_Name", value: attestationData.typeName, type: "string"},
        {name: "Mode_Name", value: attestationData.modeName, type: "string"},
        {name: "Academic_Year", value: attestationData.academicYear, type: "string"},
        {name: "File_Hash", value: attestationData.fileHash, type: "string"}
    ]);

    try {
        const tx = await eas.attest({
            schema: SCHEMA_UID,
            data: {
                recipient: attestationData.recipientAddress,
                expirationTime: undefined,
                revocable: false,
                data: encodedData,
            },
        });

        return await tx.wait();

    } catch (e) {
        console.error(e);
        return ''
    }
}

const getAttestation = async (transactionUID: string): Promise<Attestation | undefined> => {

    const eas = await configureEAS(false);

    try {
        return await eas.getAttestation(transactionUID);
    } catch (e) {
        console.error(e);

        return undefined;
    }
}

const getAttestationView = async (transactionUID: string): Promise<AttestationDataView | undefined> => {

    const attestation = await getAttestation(transactionUID);
    console.log(attestation)
    if (!attestation || attestation.uid === "0x0000000000000000000000000000000000000000000000000000000000000000") {
        return undefined;
    }

    const decodedSchema = decodeAttestationData(attestation!.data);
    console.log("Schema is decoded")
    return mapAttestationData(attestation!, decodedSchema);

}

const decodeAttestationData = (attestationData : string) : SchemaDecodedItem[] =>{
    const schemaEncoder = new SchemaEncoder(Schema);

    return schemaEncoder.decodeData(attestationData);
}

const getFileHash = async (transactionUID: string): Promise<string | undefined> => {

    const attestation = await getAttestationView(transactionUID);

    return attestation?.fileHash || undefined;

}

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

const mapAttestationData = (attestation: Attestation, decodedData: SchemaDecodedItem[]): AttestationDataView => {

    const date = new Date(Number(attestation.time) * 1000);
    const dateString =
        new Intl.DateTimeFormat('en-GB', {
            dateStyle: 'full',
            timeStyle: 'long',
        }).format(date);

    console.log("Schema is mapped to attestation data")
    return {
        recipientAddress: attestation!.recipient,
        attester: attestation!.attester,
        schema: attestation!.schema,
        time: dateString,
        uid: attestation!.uid,
        universityName: decodedData?.find((item) => item.name === "University_Name")?.value.value.toString() || "",
        facultyName: decodedData?.find((item) => item.name === "Faculty_Name")?.value.value.toString() || "",
        modeName: decodedData?.find((item) => item.name === "Mode_Name")?.value.value.toString() || "",
        typeName: decodedData?.find((item) => item.name === "Type_Name")?.value.value.toString() || "",
        academicYear: decodedData?.find((item) => item.name === "Academic_Year")?.value.value.toString() || "",
        programmeName: decodedData?.find((item) => item.name === "Programme_Name")?.value.value.toString() || "",
        fileHash: decodedData?.find((item) => item.name === "File_Hash")?.value.value.toString() || "",
    };
}

export default {createAttestation, getAttestation, getAttestationView, getFileHash};