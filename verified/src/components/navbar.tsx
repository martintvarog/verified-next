import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const NavBar: React.FC = () => {
    return (
        <AppBar position="static" style={{ backgroundColor: '#242424' }}>
            <Toolbar style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button component={Link} to="/createAttestation" color="inherit" style={{ fontWeight: 500, color: '#646cff', textDecoration: 'none' }}>Create Attestation</Button>
                <Button component={Link} to="/viewAttestation" color="inherit" style={{ fontWeight: 500, color: '#646cff', textDecoration: 'none' }}>View Attestation</Button>
                <Button component={Link} to="/verifyAttestation" color="inherit" style={{ fontWeight: 500, color: '#646cff', textDecoration: 'none' }}>Verify Attestation</Button>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;