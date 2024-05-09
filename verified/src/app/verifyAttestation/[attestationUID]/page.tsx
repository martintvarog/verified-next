'use client'

import React from "react";
import {Button} from "@/components/ui/button";
import {InputFile} from "@/components/inputFile";
import {useRouter} from "next/navigation";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {mapValues, stubString} from "lodash/fp";
import {cn} from "@/lib/utils";
import {useAttestation} from "@/utils/useAttestation";

type PageProps = {
    params: {
        attestationUID: string;
    };
};

const VerifyAttestationPage = ({params: {attestationUID}}: PageProps) => {
    useAttestation(attestationUID);

    const schema = z.object({
        fileHash: z.string().min(1, "A file is required"),
    })

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: mapValues(stubString, schema.shape),
    });

    const router = useRouter();
    const onSubmit = form.handleSubmit((data) => {
        router.push(`/verifyAttestation/${attestationUID}/${data.fileHash}`);
    });

    const isLoading = form.formState.isSubmitting || form.formState.isSubmitSuccessful;

    return (
        <Form {...form}>
            <form onSubmit={onSubmit} className={cn("w-full", isLoading && "pointer-events-none")}>
                <FormField
                    name="fileHash"
                    control={form.control}
                    render={({field: {ref: _, ...field}}) => (
                        <FormItem>
                            <FormLabel>Document</FormLabel>
                            <div className="flex space-x-2 justify-center">
                                <FormControl>
                                    <InputFile
                                        className="text-center text-white bg-gray-800 focus:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md"
                                        {...field}
                                    />
                                </FormControl>
                                <Button type="submit" loading={isLoading}>
                                    Verify document
                                </Button>
                            </div>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}

export default VerifyAttestationPage;