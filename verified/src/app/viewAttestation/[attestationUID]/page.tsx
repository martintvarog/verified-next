"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import attestationService from "@/services/attestationService";
import { ethereumHashSchema } from "@/utils/ethereumHashSchema";
import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";

export class AttestationInvalidUID extends Error {
  constructor() {
    super("Invalid attestation UID");
  }
}

type PageProps = {
  params: {
    attestationUID: string;
  };
};

const AttestationViewPage = ({ params: { attestationUID } }: PageProps) => {
  if (!ethereumHashSchema.safeParse(attestationUID).success)
    throw new AttestationInvalidUID();

  const { data: attestation } = useSuspenseQuery({
    queryKey: ["attestation", attestationUID],
    queryFn: () => {
      const attestation = attestationService.getAttestationView(attestationUID);
      if (!attestation) throw new Error("Attestation not found");
      return attestation;
    },
  });

  const pathname = usePathname();
  const copyAttestationLink = () => {
    const currentURL = new URL(pathname, window.location.origin);
    navigator.clipboard.writeText(currentURL.toString());
  };

  const attestationForm = useForm({
    values: attestation,
  });

  return (
    <>
      <Form {...attestationForm}>
        <form className="space-y-6 w-full">
          <FormField
            control={attestationForm.control}
            name="recipientAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipient&apos;s address</FormLabel>
                <FormControl>
                  <Input
                    className="text-center text-white bg-gray-800 focus:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md"
                    readOnly={true}
                    placeholder="shadcn"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The address of the recipient of the attestation
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={attestationForm.control}
            name="attester"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Attester&apos;s Address </FormLabel>
                <FormControl>
                  <Input
                    className="text-white bg-gray-800 focus:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md text-center"
                    readOnly={true}
                    placeholder="shadcn"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The address of the attester of the attestation
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={attestationForm.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Created </FormLabel>
                <FormControl>
                  <Input
                    className="text-white bg-gray-800 focus:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md text-center"
                    readOnly={true}
                    placeholder="shadcn"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The timestamp of the attestation
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={attestationForm.control}
            name="universityName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>University Name </FormLabel>
                <FormControl>
                  <Input
                    className="text-white bg-gray-800 focus:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md text-center"
                    readOnly={true}
                    placeholder="shadcn"
                    {...field}
                  />
                </FormControl>
                <FormDescription>The name of the university</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={attestationForm.control}
            name="facultyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Faculty Name </FormLabel>
                <FormControl>
                  <Input
                    className="text-white bg-gray-800 focus:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md text-center"
                    readOnly={true}
                    placeholder="shadcn"
                    {...field}
                  />
                </FormControl>
                <FormDescription>The name of the faculty</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={attestationForm.control}
            name="programmeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Programme Name </FormLabel>
                <FormControl>
                  <Input
                    className="text-white bg-gray-800 focus:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md text-center"
                    readOnly={true}
                    placeholder="shadcn"
                    {...field}
                  />
                </FormControl>
                <FormDescription>The name of the programme</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={attestationForm.control}
            name="typeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type Name </FormLabel>
                <FormControl>
                  <Input
                    className="text-white bg-gray-800 focus:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md text-center"
                    readOnly={true}
                    placeholder="shadcn"
                    {...field}
                  />
                </FormControl>
                <FormDescription>The name of the type</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={attestationForm.control}
            name="modeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mode Name </FormLabel>
                <FormControl>
                  <Input
                    className="text-white bg-gray-800 focus:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md text-center"
                    readOnly={true}
                    placeholder="shadcn"
                    {...field}
                  />
                </FormControl>
                <FormDescription>The name of the mode</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={attestationForm.control}
            name="academicYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Academic Year </FormLabel>
                <FormControl>
                  <Input
                    className="text-white bg-gray-800 focus:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md text-center"
                    readOnly={true}
                    placeholder="shadcn"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The academic year of the attestation
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={attestationForm.control}
            name="uid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UID </FormLabel>
                <FormControl>
                  <Input
                    className="text-white bg-gray-800 focus:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md text-center"
                    readOnly={true}
                    placeholder="shadcn"
                    {...field}
                  />
                </FormControl>
                <FormDescription>The UID of the attestation</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={attestationForm.control}
            name="fileHash"
            render={({ field }) => (
              <FormItem>
                <FormLabel>File Hash </FormLabel>
                <FormControl>
                  <Input
                    className="text-white bg-gray-800 focus:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md text-center"
                    readOnly={true}
                    placeholder="shadcn"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The hash of the attached document
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="flex justify-between w-full space-x-5 mt-4">
        <Button className="w-1/2" onClick={copyAttestationLink}>
          Copy Attestation
        </Button>
        <Link href="/viewAttestation" className="w-1/2">
          <Button className="w-full">
            View Another Attestation
          </Button>
        </Link>
      </div>
    </>
  );
};

export default AttestationViewPage;
