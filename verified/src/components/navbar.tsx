import Link from 'next/link';
import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import {Button} from "@/components/ui/button";

const NavBar: React.FC = () => {
    return (
        <AppBar position="static"  style={{ backgroundColor: '#242424' }} >
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
        </AppBar>
    );
};

export default NavBar;