"use client";

import React from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useSetSearchParam } from "@/utils/useSetSearchParam";
import { AttestationNotFound } from "./page";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ViewAttestationError = ({ error, reset }: ErrorPageProps) => {
  const setSearchParam = useSetSearchParam();

  // Attestation not found error should reset the page after a bit
  React.useEffect(() => {
    if (!(error instanceof AttestationNotFound)) return;

    const resetTO = setTimeout(() => {
      setSearchParam("error", null);
      reset();
    }, 2000);
    return () => {
      clearTimeout(resetTO);
    };
  }, [error, reset, setSearchParam]);

  return (
    <Alert variant="destructive" className="max-w-6xl w-full">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{error.message}</AlertDescription>
    </Alert>
  );
};

export default ViewAttestationError;
