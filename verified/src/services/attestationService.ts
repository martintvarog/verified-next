import {Attestation, EAS, SchemaDecodedItem, SchemaEncoder} from "@ethereum-attestation-service/eas-sdk";
import {EAS_CONTRACT_ADDRESS_SEPOLIA, SCHEMA, SCHEMA_UID} from "@/config/config";
import {AttestationData, AttestationDataView} from "@/types/attestationData";
import {ConfiguredEAS} from "@/services/configureEAS";
import { AttestationError } from "@/utils/attestationError";
import { identity } from "lodash/fp";


const Schema = "string University_Name, string Faculty_Name, string Programme_Name, string Type_Name, string Mode_Name, string Academic_Year, string File_Hash";

export const createAttestation = async (attestationData: AttestationData): Promise<string> => {
    const eas: EAS = await ConfiguredEAS.configureEAS(true);

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

const getAttestation = async (transactionUID: string): Promise<Attestation> => {
  const eas = await ConfiguredEAS.configureEAS(false);
  // Errors as values FTW
  const attestation = await eas.getAttestation(transactionUID).catch(identity);

  if (attestation instanceof Error) {
    console.error(attestation);
    throw new AttestationError("Something went wrong");
  }

  if (!attestation) throw new AttestationError("Attestation not found");

  return attestation;
}

export const getAttestationView = async (transactionUID: string): Promise<AttestationDataView> => {
    const attestation = await getAttestation(transactionUID);
    console.log(attestation)
    if (attestation.uid === "0x0000000000000000000000000000000000000000000000000000000000000000") 
      throw new AttestationError("Attestation not found");

    const decodedSchema = decodeAttestationData(attestation.data);
    console.log("Schema is decoded")
    return mapAttestationData(attestation, decodedSchema);
}

const decodeAttestationData = (attestationData: string): SchemaDecodedItem[] => {
    const schemaEncoder = new SchemaEncoder(Schema);

    return schemaEncoder.decodeData(attestationData);
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

