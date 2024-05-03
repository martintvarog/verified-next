'use client'

import Image from "next/image";
import Link from 'next/link';

export default function Home() {
    return (
        <main className="container">

                <h2>Ověřeno.cz/Verified.com</h2>
                <button className="button-div">
                    <Link href="createAttestation">Create Attestation</Link>
                </button>
                <button className="button-div">
                    <Link href="viewAttestation">View Attestation</Link>
                </button>
                <button className="button-div">
                    <Link href="verifyAttestation">Verify Attestation</Link>
                </button>

        </main>
    );
}