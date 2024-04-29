"use client";

import React from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { AttestationInvalidUID } from "./[attestationUID]/page";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ViewAttestationError = ({ error, reset }: ErrorPageProps) => {
  let actions: React.ReactNode;
  if (error instanceof AttestationInvalidUID) {
    actions = (
      <Link href="/createAttestation">
        <Button variant="default">
          View a different attestation
        </Button>
      </Link>
    );
  } else {
    actions = (
      <Button onClick={reset}>
        Try again
      </Button>
    );
  }

  return (
    <div className="self-center">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
      <div className="mt-4 self-center">
        {actions}
      </div>
    </div>
  );
};

export default ViewAttestationError;
