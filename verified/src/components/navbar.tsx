import Link from 'next/link';
import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import { Sixtyfour } from "next/font/google";

const logoFont = Sixtyfour({ subsets: ["latin"] });

const NavBar: React.FC = () => {
    return (
        <AppBar
            position="sticky"
            style={{ backgroundColor: "#242424" }}
        >
            <div
                className={cn(
                    "flex flex-col p-4 max-w-7xl mx-auto w-full space-y-4",
                    "lg:grid lg:grid-cols-[repeat(2,auto)] lg:space-y-0 lg:space-x-4 lg:items-center"
                )}
            >
            <Link href="/">
                <h1 className={cn(
                    "text-blue-400 text-3xl text-center",
                    "lg:pl-4 lg:text-left",
                    logoFont.className
                )}>
                    Verified
                </h1>
            </Link>
            <Toolbar className="justify-center items-center flex">
                <Link href={"createAttestation"}>
                    <Button className="mr-4">
                        Create Attestation
                    </Button>
                </Link>
                <Link href={"viewAttestation"}>
                    <Button className="mr-4">
                        View Attestation
                    </Button>
                </Link>
                <Link href={"verifyAttestation"}>
                    <Button className="mr-4">
                        Verify Attestation
                    </Button>
                </Link>
            </Toolbar>
            </div>
        </AppBar>
    );
};

export default NavBar;