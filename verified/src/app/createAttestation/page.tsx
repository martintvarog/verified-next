'use client'

import WalletService from "@/services/walletService";
import {useEffect, useState} from "react";
import attestationService from "@/services/attestationService";
import Spinner from "@/components/spinner";
import {InputFile} from "@/components/inputFile";
import {z} from "zod";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useQuery} from "@tanstack/react-query";
import {mapValues} from "lodash"
import {useRouter} from "next/navigation";

const Page = () => {
    const [transactionUID, setTransactionUID] = useState('');
    const router = useRouter();

    const {data: isWalletConnected} = useQuery({
        queryKey: ['isWalletConnected'],
        queryFn: async () => await WalletService.isWalletConnected()
    });

    const formSchema = z.object({
        recipientAddress: z.string().refine((val) => /^0x[a-fA-F0-9]{40}$/.test(val), {
            message: 'Invalid Ethereum address',
        }),
        universityName: z.string().min(1, {
            message: "University name is required",
        }),
        facultyName: z.string().min(1, {
            message: "Faculty name is required",
        }),
        modeName: z.string().min(1, {
            message: "Mode name is required",
        }),
        typeName: z.string().min(1, {
            message: "Type name is required",
        }),
        academicYear: z.string().refine((val) => /^[0-9]{4}\/[0-9]{4}$/.test(val), {
            message: 'Academic year should have format 0000/0000',
        }),
        programmeName: z.string().min(1, {
            message: "Programme name is required",
        }),
        fileHash: z.string().min(1, {
            message: "File hash is required",
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: mapValues(() => "", formSchema.shape)
    })


    const handleSubmit = form.handleSubmit(
        async (data) => {
            console.log(data);
            const transactionUID = await attestationService.createAttestation(data);
            console.log(transactionUID);
            setTransactionUID(transactionUID);
        });


    useEffect(() => {
        if (isWalletConnected === false) router.push('/connectWallet');
    }, [isWalletConnected, router])

    useEffect(() => {
        if (transactionUID) router.push(`/viewAttestation?transactionUID=${transactionUID}`);
    }, [transactionUID, router])

    useEffect(() => {
        if (form.formState.isSubmitting) Spinner(true);
    }, [form.formState.isSubmitting])

    // if (transactionUID) return router.push(`/viewAttestation?transactionUID=${transactionUID}`);
    //
    // if (form.formState.isSubmitting)
    //     return Spinner(true);
    //
    // if (isWalletConnected === false) return router.push('/connectWallet');

    return (
        <div className='m-5 w-full justify-center  max-w-6xl'>
            <div>

                {
                    // isWalletConnected && alertShow ?
                    // <Alert severity="success" variant={"filled"} className={alertShow ? "fade" : ""}>Wallet is connected.</Alert> :

                    <Form {...form}>
                        <form onSubmit={handleSubmit} className="space-y-6 w-full" name="form">
                            <FormField
                                control={form.control}
                                name="recipientAddress"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Recipient Address</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="text-center text-white bg-gray-800 focus:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md"
                                                type="text"
                                                placeholder="0x..." {...field}/>
                                        </FormControl>
                                        <FormDescription>
                                            The address of the recipient
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
                                        <FormLabel>University Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="text-center text-white bg-gray-800 focus:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md"
                                                placeholder="University of Cambridge" {...field}
                                                type="text"/>
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
                                        <FormLabel>Faculty Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="text-center text-white bg-gray-800 focus:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md"
                                                type="text"
                                                placeholder="Faculty of Computer Science " {...field}/>
                                        </FormControl>
                                        <FormDescription>
                                            The name of the faculty
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}

                            />

                            <FormField
                                control={form.control}
                                name="modeName"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Study Mode</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="text-center text-white bg-gray-800 focus:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md"
                                                placeholder="Full-time" {...field}/>
                                        </FormControl>
                                        <FormDescription>
                                            The mode of study
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}

                            />

                            <FormField
                                control={form.control}
                                name="typeName"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Type of Degree</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="text-center text-white bg-gray-800 focus:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md"
                                                placeholder="Bachelor, Master, PhD, etc." {...field}/>
                                        </FormControl>
                                        <FormDescription>
                                            The type of degree
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}

                            />

                            <FormField
                                control={form.control}
                                name="academicYear"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Academic Year</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="text-center text-white bg-gray-800 focus:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md"
                                                placeholder="2023/2024" {...field}/>
                                        </FormControl>
                                        <FormDescription>
                                            The academic year
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}

                            />

                            <FormField
                                control={form.control}
                                name="programmeName"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Programme</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="text-center text-white bg-gray-800 focus:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md"
                                                placeholder="Computer Science" {...field}/>
                                        </FormControl>
                                        <FormDescription>
                                            The name of the programme
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}

                            />


                            <Controller
                                name="fileHash"
                                control={form.control}
                                render={({field: {ref: _, ...field}}) => (
                                    <InputFile {...field}/>
                                )}
                            />

                            <Button className={'w-full'} type="submit">Create Attestation</Button>
                        </form>

                    </Form>
                }
            </div>

        </div>
    );
};

export default Page;