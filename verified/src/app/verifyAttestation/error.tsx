"use client";



import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AttestationError } from "@/utils/attestationError";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const VerifyAttestationError = ({ error, reset }: ErrorPageProps) => {
  let actions: React.ReactNode;
  if (error instanceof AttestationError) {
    actions = (
      <Link href="/verifyAttestation">
        <Button variant="default">
          Verify a different attestation
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

export default VerifyAttestationError;
