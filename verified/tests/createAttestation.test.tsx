// add tests for createAttestation.page.tsx
import { render, screen } from '@testing-library/react';
import React from "react";
import Page from "@/app/createAttestation/page";
import {useRouter} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import '@testing-library/jest-dom'


jest.mock('next/navigation');
jest.mock("@tanstack/react-query");

describe('createAttestation', () => {
  it('renders without crashing', () => {
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
    // form should be rendered
    const formElement = screen.getByRole('form');
    expect(formElement).toBeInTheDocument();


  });
});