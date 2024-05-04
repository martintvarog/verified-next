// write tests for the verificationStatus component

import React from 'react';
import { render } from '@testing-library/react';
import VerificationStatus from '../src/components/verificationStatus';
import '@testing-library/jest-dom'


describe('VerificationStatus', () => {
    it('should render a green checkmark when verified is true', () => {
        // arrange
        // act
        const { getByText } = render(<VerificationStatus verified={true} />);

        // assert
        expect(getByText('✓')).toBeInTheDocument();
        expect(getByText('Verified')).toBeInTheDocument();
    });

    it('should render a red x when verified is false', () => {
        // arrange
        // act
        const { getByText } = render(<VerificationStatus verified={false} />);

        // assert
        expect(getByText('✕')).toBeInTheDocument();
        expect(getByText('Not Verified')).toBeInTheDocument();
    });
});