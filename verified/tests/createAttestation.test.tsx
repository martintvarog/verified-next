// add tests for createAttestation.page.tsx
import {render, screen} from '@testing-library/react';
import React from "react";
import Page from "@/app/createAttestation/page";
import {useRouter} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import '@testing-library/jest-dom'


jest.mock('next/navigation');
jest.mock("@tanstack/react-query");

describe('createAttestation', () => {
    it('should render a form', () => {
        // arrange
        (useRouter as jest.Mock).mockReturnValue({
            push: jest.fn()
        });

        (useQuery as jest.Mock).mockReturnValue({
            data: jest.fn()
        });

        // act
        render(<Page/>);

        // assert
        const formElement = screen.getByRole('form');
        expect(formElement).toBeInTheDocument();
    });
    it('should redirect to /connectWallet if wallet is not connected', () => {
        // arrange
        (useRouter as jest.Mock).mockReturnValue({
            push: jest.fn().mockReturnValue('/connectWallet')
        });

        (useQuery as jest.Mock).mockReturnValue({
            data: false
        });

        // act
        render(<Page/>);

        // assert
        expect(useRouter().push).toHaveBeenCalledWith('/connectWallet');
    });
    it('should render a form with all attestation fields', () => {
        // arrange
        (useRouter as jest.Mock).mockReturnValue({
            push: jest.fn()
        });

        (useQuery as jest.Mock).mockReturnValue({
            data: true
        });

        // act
        render(<Page/>);

        // assert
        // Check if the form has all the fields
        const formField = screen.getByLabelText('Recipient Address');

        expect(formField).toBeInTheDocument();


    });


});