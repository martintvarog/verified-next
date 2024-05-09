// add tests for createAttestation.page.tsx
import { render, screen } from "@testing-library/react";
import React from "react";
import Page from "@/app/createAttestation/page";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { expect } from "@jest/globals";
import * as WalletService from "@/services/walletService";

jest.mock("next/navigation");
jest.mock("@tanstack/react-query");
jest.mock("verified/src/services/walletService");

describe("createAttestation", () => {
    it("should render a form", async () => {
        // arrange
        (useRouter as jest.Mock).mockReturnValue({
            push: jest.fn(),
        });

        (useSearchParams as jest.Mock).mockReturnValue({
            has: jest.fn().mockReturnValue(true),
            get: jest.fn().mockReturnValue(true),
        });

        (useQuery as jest.Mock).mockReturnValue({
            data: jest.fn(),
        });

        (WalletService.connectWallet as jest.Mock).mockReturnValue(true);

        // act
        render(<Page />);

        // assert
        expect(await screen.findByRole("form")).toBeInTheDocument();
    });
    it("should redirect to /connectWallet if wallet is not connected", () => {
        // arrange
        (useRouter as jest.Mock).mockReturnValue({
            push: jest.fn().mockReturnValue("/connectWallet"),
        });

        (useSearchParams as jest.Mock).mockReturnValue({
            has: jest.fn().mockReturnValue(false),
            get: jest.fn().mockReturnValue(false),
        });

        (useQuery as jest.Mock).mockReturnValue({
            data: false,
        });

        // act
        render(<Page />);

        // assert
        expect(useRouter().push).toHaveBeenCalledWith("/connectWallet");
    });
    it("should render a form with all attestation fields", async () => {
        // arrange
        (useRouter as jest.Mock).mockReturnValue({
            push: jest.fn(),
        });

        (useSearchParams as jest.Mock).mockReturnValue({
            has: jest.fn(),
            get: jest.fn(),
        });

        (useQuery as jest.Mock).mockReturnValue({
            data: true,
        });

        // act
        render(<Page />);

        // assert
        expect(
            await screen.findByLabelText("Recipient Address"),
        ).toBeInTheDocument();
        expect(await screen.findByLabelText("University Name")).toBeInTheDocument();
        expect(await screen.findByLabelText("Faculty Name")).toBeInTheDocument();
        expect(await screen.findByLabelText("Study Mode")).toBeInTheDocument();
        expect(await screen.findByLabelText("Type of Degree")).toBeInTheDocument();
        expect(await screen.findByLabelText("Academic Year")).toBeInTheDocument();
        expect(await screen.findByLabelText("Programme")).toBeInTheDocument();
    });
    it("should render a submit button", async () => {
        // arrange
        (useRouter as jest.Mock).mockReturnValue({
            push: jest.fn(),
        });

        (useSearchParams as jest.Mock).mockReturnValue({
            has: jest.fn(),
            get: jest.fn(),
        });

        (useQuery as jest.Mock).mockReturnValue({
            data: true,
        });

        // act
        render(<Page />);

        // assert
        const button = await screen.findByRole("button", { name: "Create Attestation" });
        expect(button).toBeInTheDocument();
    });
    it("should render InputFile component", async () => {
        // arrange
        (useRouter as jest.Mock).mockReturnValue({
            push: jest.fn(),
        });

        (useSearchParams as jest.Mock).mockReturnValue({
            has: jest.fn(),
            get: jest.fn(),
        });

        (useQuery as jest.Mock).mockReturnValue({
            data: true,
        });

        // act
        render(<Page />);

        // assert
        // const controller = screen.getByRole('form').querySelector('Controller[name="fileHash"]');
        // expect(controller).toBeInTheDocument();

        const documentInput = await screen.findByLabelText("Document");
        expect(documentInput).toBeInTheDocument();
        expect(documentInput).toHaveAttribute("type", "file");
    });
});