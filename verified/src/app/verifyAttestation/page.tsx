'use client'

import React, {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import attestationService from "@/services/attestationService";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {AlertCircle} from "lucide-react";
import {InputFile} from "@/components/inputFile";
import VerificationStatus from "@/components/verificationStatus";
import {useRouter, useSearchParams} from "next/navigation";


const VerifyAttestationPage = () => {
    const [transactionUID, setTransactionUID] = useState<string | undefined>(undefined);
    const [inputTransactionUID, setInputTransactionUID] = useState<string>('');
    const [attestationToVerifyFileHash, setAttestationToVerifyFileHash] = useState<string>('');
    const [existingFileHash, setExistingFileHash] = useState<string | undefined>();
    const [displayHeader, setDisplayHeader] = useState<boolean>(true);
    const [displayAlert, setDisplayAlert] = useState<boolean>(false)

    const router = useRouter();

    const searchParams = useSearchParams()

    // Fetch transactionUID when component mounts
    React.useEffect(() => {
        const uid = searchParams.get('transactionUID');
        if (uid) {
            setTransactionUID(uid);
        }
    }, [searchParams]);

    useQuery({
        queryKey: ['attestation', transactionUID],
        queryFn: async () => {
            if (transactionUID) {
                await attestationService.getFileHash(transactionUID!).then(
                    (fileHash) => {
                        if (!fileHash) {
                            console.log("Error");
                            setDisplayAlert(true);
                            setTimeout(() => {
                                setDisplayAlert(false);
                            }, 2000);
                        } else {
                            console.log(fileHash);
                            setExistingFileHash(fileHash);
                        }
                    }
                )
            }
        },
        enabled: !!transactionUID
    });

    const handleEnterIdentifier = () => {
        console.log("Enter Identifier");
        console.log(inputTransactionUID);
        if (inputTransactionUID!.trim() !== '') {
            setTransactionUID(inputTransactionUID);
        }
    }

    useEffect(() => {
        setDisplayHeader(true);
        setTimeout(() => {
            setDisplayHeader(false);
        }, 1000);

    }, [])

    return (
        <div className={'m-5 w-full center'}>
            {displayHeader ?

                <h1 className={"text-indigo-100 text-center font-bold text-5xl mb-8"}>Verify Attestation</h1>

                :

                displayAlert ? (<Alert variant="destructive" className={displayAlert ? "fade max-w-6xl w-full" : ""}>
                        <AlertCircle className="h-4 w-4"/>
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            Transaction Identifier is invalid
                        </AlertDescription>
                    </Alert>) :

                    (!transactionUID || !existingFileHash) ? (
                        <div>
                            <div className="flex w-full max-w-6xl items-center space-x-2 justify-center m-5">
                                <Input
                                    className="text-white bg-gray-800 focus:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md"
                                    onChange={(e) => setInputTransactionUID(e.target.value)} type="email"
                                    placeholder="Enter transaction UID..."/>
                                <Button
                                    onClick={handleEnterIdentifier} type="submit">Enter Identifier</Button>
                            </div>

                        </div>
                    ) : transactionUID && !attestationToVerifyFileHash ? (
                        <div>
                            <InputFile onChange={setAttestationToVerifyFileHash}/>
                        </div>
                    ) : (
                        existingFileHash && attestationToVerifyFileHash) ?
                        (
                            <div className="flex w-full max-w-6xl items-center space-x-2 justify-center m-5">
                                <VerificationStatus
                                    verified={existingFileHash === attestationToVerifyFileHash}/>
                                <div className="flex m-5 space-x-10">
                                    <Button className="ml-5" onClick={() => router.push('/')}>Verify Another Attestation</Button>
                                </div>
                            </div>
                        ) : null
            }
        </div>
    );
}

export default VerifyAttestationPage;
