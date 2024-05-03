'use client'

import React, {useMemo, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {AttestationDataView} from "@/types/attestationData.ts";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {AlertCircle} from "lucide-react";
import {useQuery} from "@tanstack/react-query";
import attestationService from "@/services/attestationService";

const ViewAttestationPage = () => {
    const [transactionUID, setTransactionUID] = useState<string>();
    const [inputTransactionUID, setInputTransactionUID] = useState<string>('');
    const [displayHeader, setDisplayHeader] = useState<boolean>(true);
    const [attestation, setAttestation] = useState<AttestationDataView | undefined>(undefined);
    const [displayAlert, setDisplayAlert] = useState<boolean>(false)

    const location = useLocation();

    const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

    // Fetch transactionUID when component mounts
    React.useEffect(() => {
        setDisplayHeader(true);
        setTimeout(() => {
            setDisplayHeader(false);
        }, 2000);
        const uid = searchParams.get('transactionUID');
        if (uid) {
            setTransactionUID(uid);
        }
    }, [location.search, searchParams]);

    useQuery({
            queryKey: ['attestation', transactionUID],
            queryFn: async () => {
                if (transactionUID) {
                    await attestationService.getAttestationView(transactionUID).then(
                        (attestation) => {
                            if (!attestation) {
                                console.log("Error");
                                setDisplayAlert(true);
                                setTimeout(() => {
                                    setDisplayAlert(false);
                                }, 2000);
                            } else {
                                setAttestation(attestation);
                                console.log(attestation);

                            }
                        }
                    );
                }
            },
            enabled: !!transactionUID
        }
    );

    const handleEnterIdentifier = async () => {
        console.log("Enter Identifier");
        console.log(inputTransactionUID);
        if (inputTransactionUID!.trim() !== '') {
            setTransactionUID(inputTransactionUID);
        }
    }

    const copyURL = (): void => {
        const currentURL = window.location.host + window.location.pathname + "?transactionUID=" + transactionUID;

        navigator.clipboard.writeText(currentURL)
    }

    const formSchema = z.object({
        recipientAddress: z.string(),
        attester: z.string(),
        time: z.string(),
        universityName: z.string(),
        facultyName: z.string(),
        modeName: z.string(),
        typeName: z.string(),
        academicYear: z.string(),
        programmeName: z.string(),
        uid: z.string(),
        fileHash: z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            recipientAddress: undefined,
            attester: undefined,
            time: undefined,
            universityName: undefined,
            facultyName: undefined,
            modeName: undefined,
            typeName: undefined,
            academicYear: undefined,
            programmeName: undefined,
            uid: undefined,
            fileHash: undefined,
        },
    })


    return (
        <div className={'m-5 w-full justify-center '}>
            {displayHeader ? (
                    <h1 className={displayHeader ? "text-indigo-100 text-center font-bold text-5xl mb-8  fade" : ""}>
                        View Attestation</h1>) :
                displayAlert ? (<Alert variant="destructive" className={displayAlert ? "fade max-w-6xl w-full" : ""}>
                        <AlertCircle className="h-4 w-4"/>
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            Transaction Identifier is invalid
                        </AlertDescription>
                    </Alert>) :
                    (transactionUID == null || transactionUID == '') || !attestation ? (

                        <div className="flex w-full max-w-6xl items-center space-x-2 justify-center m-5">

                            <Input
                                className="text-white bg-gray-800 focus:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md"
                                onChange={(e) => setInputTransactionUID(e.target.value)} type="email"
                                placeholder="Enter transaction UID..."/>
                            <Button
                                // className="bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-white font-bold py-2 px-4 rounded"
                                onClick={handleEnterIdentifier} type="submit">Enter Identifier</Button>
                        </div>


                    ) : (
                        attestation && (

                            <Form {...form}>
                                <form className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="recipientAddress"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Recipient's address</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="text-center text-white bg-gray-800 focus:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md"
                                                        readOnly={true}
                                                        placeholder="shadcn" {...field}
                                                        value={attestation?.recipientAddress}/>
                                                </FormControl>
                                                <FormDescription>
                                                    The address of the recipient of the attestation
                                                </FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="attester"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Attester's Address </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="text-white bg-gray-800 focus:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md text-center"
                                                        readOnly={true}
                                                        placeholder="shadcn" {...field}
                                                        value={attestation?.attester}/>
                                                </FormControl>
                                                <FormDescription>
                                                    The address of the attester of the attestation
                                                </FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="time"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Created </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="text-white bg-gray-800 focus:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md text-center"
                                                        readOnly={true}
                                                        placeholder="shadcn" {...field}
                                                        value={attestation?.time}/>
                                                </FormControl>
                                                <FormDescription>
                                                    The timestamp of the attestation
                                                </FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="universityName"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>University Name </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="text-white bg-gray-800 focus:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md text-center"
                                                        readOnly={true}
                                                        placeholder="shadcn" {...field}
                                                        value={attestation?.universityName}/>
                                                </FormControl>
                                                <FormDescription>
                                                    The name of the university
                                                </FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="facultyName"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Faculty Name </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="text-white bg-gray-800 focus:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md text-center"
                                                        readOnly={true}
                                                        placeholder="shadcn" {...field}
                                                        value={attestation?.facultyName}/>
                                                </FormControl>
                                                <FormDescription>
                                                    The name of the faculty
                                                </FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )
                                        }
                                    />
                                    <FormField
                                        control={form.control}
                                        name="programmeName"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Programme Name </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="text-white bg-gray-800 focus:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md text-center"
                                                        readOnly={true}
                                                        placeholder="shadcn" {...field}
                                                        value={attestation?.programmeName}/>
                                                </FormControl>
                                                <FormDescription>
                                                    The name of the programme
                                                </FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )
                                        }
                                    />
                                    <FormField
                                        control={form.control}
                                        name="typeName"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Type Name </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="text-white bg-gray-800 focus:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md text-center"
                                                        readOnly={true}
                                                        placeholder="shadcn" {...field}
                                                        value={attestation?.typeName}/>
                                                </FormControl>
                                                <FormDescription>
                                                    The name of the type
                                                </FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )
                                        }
                                    />

                                    <FormField
                                        control={form.control}
                                        name="modeName"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Mode Name </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="text-white bg-gray-800 focus:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md text-center"
                                                        readOnly={true}
                                                        placeholder="shadcn" {...field}
                                                        value={attestation?.modeName}/>
                                                </FormControl>
                                                <FormDescription>
                                                    The name of the mode
                                                </FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )
                                        }
                                    />


                                    <FormField
                                        control={form.control}
                                        name="academicYear"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Academic Year </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="text-white bg-gray-800 focus:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md text-center"
                                                        readOnly={true}
                                                        placeholder="shadcn" {...field}
                                                        value={attestation?.academicYear}/>
                                                </FormControl>
                                                <FormDescription>
                                                    The academic year of the attestation
                                                </FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )
                                        }
                                    />


                                    <FormField
                                        control={form.control}
                                        name="uid"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>UID </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="text-white bg-gray-800 focus:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md text-center"
                                                        readOnly={true}
                                                        placeholder="shadcn" {...field}
                                                        value={attestation?.uid}/>
                                                </FormControl>
                                                <FormDescription>
                                                    The UID of the attestation
                                                </FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )
                                        }
                                    />

                                    <FormField
                                        control={form.control}
                                        name="fileHash"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>File Hash </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="text-white bg-gray-800 focus:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md text-center"
                                                        readOnly={true}
                                                        placeholder="shadcn" {...field}
                                                        value={attestation?.fileHash}/>
                                                </FormControl>
                                                <FormDescription>
                                                    The hash of the attached document
                                                </FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )
                                        }
                                    />


                                </form>
                            </Form>
                        )
                    )}

            {attestation && !displayHeader ?
                <Button className=" space-y-5 m-10 w-full mx-auto block" onClick={copyURL}>Copy Attestation</Button>

                : null}

        </div>
    );
};

export default ViewAttestationPage;