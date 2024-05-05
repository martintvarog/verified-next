// add tests for createAttestation.page.tsx
import {render, screen} from '@testing-library/react';
import React from "react";
import Page from "@/app/createAttestation/page";
import {useRouter} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import '@testing-library/jest-dom'
import {expect} from "@jest/globals";


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
        expect(screen.getByLabelText('Recipient Address')).toBeInTheDocument();
        expect(screen.getByLabelText('University Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Faculty Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Study Mode')).toBeInTheDocument();
        expect(screen.getByLabelText('Type of Degree')).toBeInTheDocument();
        expect(screen.getByLabelText('Academic Year')).toBeInTheDocument();
        expect(screen.getByLabelText('Programme')).toBeInTheDocument();

    });
    it('should render a submit button', () => {
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
        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.getByRole('button')).toHaveTextContent('Create Attestation');
    });
    it('should render InputFile component', () => {
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
        // const controller = screen.getByRole('form').querySelector('Controller[name="fileHash"]');
        // expect(controller).toBeInTheDocument();

        const inputFile = screen.getByLabelText('Document');
        expect(inputFile).toBeInTheDocument();
    });


});