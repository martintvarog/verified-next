import { ethereumHashSchema } from "@/utils/ethereumHashSchema";
import { TRPCError, initTRPC } from "@trpc/server";
import * as EASService from "@/services/easService";
import * as AttestationService from "@/services/attestationService";
import { identity } from "lodash/fp";

const t = initTRPC.create();

export const appRouter = t.router({
  getAttestation: t.procedure
    .input(ethereumHashSchema)
    .query(async ({ input: attestationUID }) => {
      const eas = await EASService.getEASServer();
      // Errors as values FTW
      const attestation = await eas.getAttestation(attestationUID).catch(identity);

      if (attestation instanceof Error) 
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
          cause: attestation,
        });


      if (!attestation || attestation.uid === "0x0000000000000000000000000000000000000000000000000000000000000000") 
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Attestation not found",
        });

      return AttestationService.parseAttestation(attestation);
    }),
});

export type AppRouter = typeof appRouter;
