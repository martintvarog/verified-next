"use client";

import {Button} from "@/components/ui/button";
import VerificationStatus from "@/components/verificationStatus";
import {useAttestationFileHash} from "@/utils/useAttestationFileHash";
import Link from "next/link";

type PageProps = {
    params: {
        attestationUID: string;
        documentFileHash: string;
    };
};

const AttestationVerifyPage = ({params: {attestationUID, documentFileHash}}: PageProps) => {
    const attestationFileHash = useAttestationFileHash(attestationUID);

    return (
        <>
            <VerificationStatus
                className="self-center"
                verified={documentFileHash === attestationFileHash}
            />
            <Link className="self-center mt-5" href="/verifyAttestation">
                <Button>Verify Another Attestation</Button>
            </Link>
        </>
    );
};

export default AttestationVerifyPage;
