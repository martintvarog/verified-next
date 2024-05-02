// add viewAttestation tests

import React from 'react';

import {act, fireEvent, render, screen} from '@testing-library/react';
import Page from "@/app/viewAttestation/page";
import {useQuery} from "@tanstack/react-query";
import {useSearchParams} from "next/navigation";
import '@testing-library/jest-dom'

jest.mock('next/navigation');
jest.mock('verified/src/services/attestationService');
jest.mock('@tanstack/react-query');

describe('ViewAttestation', () => {
    it('should render enter transactionUID', async () => {
        // arrange
        (useQuery as jest.Mock).mockReturnValue({
            data: undefined,
        });

        (useSearchParams as jest.Mock).mockReturnValue({
            get: jest.fn().mockReturnValue(undefined)
        });

        // act
        render(<Page/>);

        await new Promise((resolve) => setTimeout(resolve, 3500));

        // assert
        expect(screen.getByText('Transaction UID')).toBeInTheDocument();

    });
});
