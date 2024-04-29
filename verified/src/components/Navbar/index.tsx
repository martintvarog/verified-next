"use client";

import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import { NavbarLink } from "./NavbarLink";

const NavBar: React.FC = () => (
  <AppBar position="sticky" style={{ backgroundColor: "#242424" }}>
    <Toolbar
      className="flex justify-center space-x-4"
    >
      <NavbarLink to="/createAttestation">Create Attestation</NavbarLink>
      <NavbarLink to="/viewAttestation">View Attestation</NavbarLink>
      <NavbarLink to="/verifyAttestation">Verify Attestation</NavbarLink>
    </Toolbar>
  </AppBar>
);
export default NavBar;
