"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ViewAttestationError = ({ error, reset }: ErrorPageProps) => (
  <div className="self-center">
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{error.message}</AlertDescription>
    </Alert>
    <div className="mt-4 self-center space-x-4">
      <Button onClick={reset}>
        Try again
      </Button>
      <Link href="/viewAttestation">
        <Button variant="default">
          View a different attestation
        </Button>
      </Link>
    </div>
  </div>
);

export default ViewAttestationError;
