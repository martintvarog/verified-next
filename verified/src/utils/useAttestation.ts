import * as AttestationService from "@/services/attestationService";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AttestationError } from "@/utils/attestationError";
import { ethereumHashSchema } from "./ethereumHashSchema";

export const useAttestation = (attestationUID: string) => {
  if (!ethereumHashSchema.safeParse(attestationUID).success)
    throw new AttestationError("Invalid attestation UID");

  const {data: attestation} = useSuspenseQuery({
    queryKey: ["attestation", attestationUID],
    queryFn: () => {
      const attestation = AttestationService.getAttestationView(attestationUID);
      if (!attestation) throw new AttestationError("Attestation not found");
      return attestation;
    },
  });

  return attestation;
};
