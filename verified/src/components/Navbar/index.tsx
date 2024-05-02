"use client";

import { AppBar, Toolbar } from "@mui/material";
import { NavbarLink } from "./NavbarLink";
import { Sixtyfour } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const logoFont = Sixtyfour({ subsets: ["latin"] });

const NavBar: React.FC = () => (
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
      <Toolbar
        className={cn(
          "flex flex-col space-y-4 justify-end",
          "sm:flex-row sm:space-x-4 sm:space-y-0 sm:self-center"
        )}
      >
        <NavbarLink className="sm:w-auto w-full" to="/createAttestation">Create Attestation</NavbarLink>
        <NavbarLink className="sm:w-auto w-full" to="/viewAttestation">View Attestation</NavbarLink>
        <NavbarLink className="sm:w-auto w-full" to="/verifyAttestation">Verify Attestation</NavbarLink>
      </Toolbar>
    </div>
  </AppBar>
);
export default NavBar;
