"use client";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import {useWalletConnected} from "@/utils/useWalletConnected";
import {toast} from "sonner";
import {mapValues, stubString} from "lodash/fp";
import {useMutation} from "@tanstack/react-query";
import {parseMetamaskErrorMessage} from "@/utils/parseMetamaskErrorMessage";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as AttestationService from "@/services/attestationService";
import {InputFile} from "@/components/inputFile";

const Page = () => {
    useWalletConnected();

    const formSchema = z.object({
        recipientAddress: z
            .string()
            .refine((val) => /^0x[a-fA-F0-9]{40}$/.test(val), {
                message: "Invalid Ethereum address",
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
            message: "Academic year should have format 0000/0000",
        }),
        programmeName: z.string().min(1, {
            message: "Programme name is required",
        }),
        fileHash: z.string().min(1, {
            message: "File hash is required",
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: mapValues(stubString, formSchema.shape),
    });

    const router = useRouter();
    const {mutate: createAttestation, isPending: creatingAttestation} = useMutation({
        mutationFn: AttestationService.createAttestation,
        onError: (error) => {
            console.log(error.message)
            toast.error(parseMetamaskErrorMessage(error.message));
        },
        onSuccess: (attestationUID) => {
            router.push(`/viewAttestation/${attestationUID}`);
        },
    });

    const handleSubmit = form.handleSubmit((data) => createAttestation(data));

    const isLoading = form.formState.isSubmitting || creatingAttestation;

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit} className={cn("space-y-6", isLoading && "pointer-events-none")} aria-label="form-test">
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
                                    placeholder="0x..."
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>The address of the recipient</FormDescription>
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
                                    placeholder="University of Cambridge"
                                    {...field}
                                    type="text"
                                />
                            </FormControl>
                            <FormDescription>The name of the university</FormDescription>
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
                                    placeholder="Faculty of Computer Science "
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>The name of the faculty</FormDescription>
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
                                    placeholder="Full-time"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>The mode of study</FormDescription>
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
                                    placeholder="Bachelor, Master, PhD, etc."
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>The type of degree</FormDescription>
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
                                    placeholder="2023/2024"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>The academic year</FormDescription>
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
                                    placeholder="Computer Science"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>The name of the programme</FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    name="fileHash"
                    control={form.control}
                    render={({field: {ref: _, ...field}}) => (
                        <FormItem>
                            <FormLabel>Document</FormLabel>
                            <FormControl>
                                <InputFile
                                    className="text-center text-white bg-gray-800 focus:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <Button className="w-full relative" type="submit" loading={isLoading}>
                    Create Attestation
                </Button>
            </form>
        </Form>
    );
};

export default Page;