"use client";

import React  from "react";
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
import { useRouter } from "next/navigation";
import { ethereumHashSchema } from "@/utils/ethereumHashSchema";
import { mapValues } from "lodash";
import { cn } from "@/lib/utils";

const ViewAttestationPage = () => {
  const schema = z.object({
    transactionUID: ethereumHashSchema,
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: mapValues(() => "", schema.shape),
  });

  const router = useRouter();
  const submitTransactionUIDForm = form.handleSubmit((data) => {
    router.push(`/viewAttestation/${data.transactionUID}`);
  });

  const isLoading = form.formState.isSubmitting || form.formState.isSubmitSuccessful;

  return (
    <Form {...form}>
      <form className={cn("w-full", isLoading && "pointer-events-none")} onSubmit={submitTransactionUIDForm}>
        <FormField
          name="transactionUID"
          control={form.control}
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
                <Button type="submit" loading={isLoading}>
                  View Attestation
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ViewAttestationPage;
