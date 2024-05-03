import { ethereumHashSchema } from "./ethereumHashSchema";
import { trpc } from "./trpc";
import { TRPCClientError } from "@trpc/client";

export const useAttestation = (attestationUID: string) => {
  if (!ethereumHashSchema.safeParse(attestationUID).success)
    throw new Error("Invalid attestation UID");

  const [attestation] = trpc.getAttestation.useSuspenseQuery(
    attestationUID,
    {
      retry: (retries, error) => {
        if (
          error instanceof TRPCClientError &&
          400 <= error.data.httpStatus &&
          error.data.httpStatus < 500
        ) return false;
        return retries < 3;
      },
      // refetch at most every 30 seconds
      staleTime: 1000 * 30,
    },
  );

  return attestation;
};
