import { z } from "zod";

export const ethereumHashSchema = z.string().regex(/^0x[a-fA-F0-9]{64}$/, "Invalid Ethereum hash");
