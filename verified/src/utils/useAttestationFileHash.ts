import { useAttestation } from "@/utils/useAttestation";

export const useAttestationFileHash = (attestationUID: string) => {
  const attestation = useAttestation(attestationUID);
  return attestation.fileHash;
};
