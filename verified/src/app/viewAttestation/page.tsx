"use client";

import React, { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSuspenseQuery } from "@tanstack/react-query";
import attestationService from "@/services/attestationService";
import { usePathname, useSearchParams } from "next/navigation";
import { useSetSearchParam } from "@/utils/useSetSearchParam";
import AttestationViewForm from "./AttestationViewForm";

export class AttestationNotFound extends Error {
  constructor() {
    super("Attestation not found");
  }
}

const ViewAttestationPage = () => {
  const searchParams = useSearchParams();
  const setSearchParam = useSetSearchParam();

  const transactionUID = searchParams.get("transactionUID");

  const transactionUIDSchema = z.object({
    transactionUID: z
      .string()
      .regex(/^0x[a-fA-F0-9]{64}$/, "Invalid transaction UID"),
  });

  const transactionUIDForm = useForm<z.infer<typeof transactionUIDSchema>>({
    resolver: zodResolver(transactionUIDSchema),
    defaultValues: { transactionUID: transactionUID ?? "" },
  });

  const submitTransactionUIDForm = transactionUIDForm.handleSubmit((data) => {
    setSearchParam("transactionUID", data.transactionUID);
    transactionUIDForm.reset();
  });

  const { data: attestation } = useSuspenseQuery({
    queryKey: ["attestation", transactionUID],
    queryFn: () => {
      if (!transactionUID) return null;
      const attestation = attestationService.getAttestationView(transactionUID);
      if (!attestation) throw new AttestationNotFound();
      return attestation;
    },
  });

  const pathname = usePathname();
  const copyAttestationLink = (uid: string) => {
    const currentURL = new URL(pathname, window.location.origin);
    currentURL.searchParams.set("transactionUID", uid);
    navigator.clipboard.writeText(currentURL.toString());
  };

  return (
    <>
      {!attestation && (
        <Form {...transactionUIDForm}>
          <form className="w-full" onSubmit={submitTransactionUIDForm}>
            <FormField
              name="transactionUID"
              control={transactionUIDForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction UID</FormLabel>
                  <div className="flex space-x-2 justify-center">
                    <FormControl>
                      <Input
                        className="text-white bg-gray-800 focus:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md"
                        placeholder="Enter transaction UID..."
                        {...field}
                      />
                    </FormControl>
                    <Button
                      // className="bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-white font-bold py-2 px-4 rounded"
                      type="submit"
                    >
                      Enter Identifier
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      )}

      {attestation && (
        <>
          <AttestationViewForm attestation={attestation} />
          <div className="flex justify-between w-full space-x-5 mt-4">
            <Button className="w-1/2" onClick={() => {copyAttestationLink(attestation.uid)}}>
              Copy Attestation
            </Button>
            <Button
              className="w-1/2"
              onClick={() => {
                setSearchParam("transactionUID", null);
                transactionUIDForm.reset();
                queueMicrotask(() => {
                  transactionUIDForm.setFocus("transactionUID");
                });
              }}
            >
              View Another Attestation
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default ViewAttestationPage;
