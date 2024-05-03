import Link from 'next/link';
import React from 'react';
import { AppBar, Button, Toolbar } from '@mui/material';

const NavBar: React.FC = () => {
    return (
        <AppBar position="static" style={{ backgroundColor: '#242424' }}>
            <Toolbar style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Link href={"createAttestation"}>
                    <Button color="inherit" style={{ fontWeight: 500, color: '#646cff', textDecoration: 'none' }}>
                        Create Attestation
                    </Button>
                </Link>
                <Link href={"viewAttestation"}>
                    <Button color="inherit" style={{ fontWeight: 500, color: '#646cff', textDecoration: 'none', marginLeft: '1rem' }}>
                        View Attestation
                    </Button>
                </Link>
                <Link href={"verifyAttestation"}>
                    <Button color="inherit" style={{ fontWeight: 500, color: '#646cff', textDecoration: 'none', marginLeft: '1rem' }}>
                        Verify Attestation
                    </Button>
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;