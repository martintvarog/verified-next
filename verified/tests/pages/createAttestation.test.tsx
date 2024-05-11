// add tests for createAttestation.page.tsx
import { render, screen } from "@testing-library/react";
import React from "react";
import Page from "@/app/createAttestation/page";
import {redirect, usePathname, useRouter, useSearchParams} from "next/navigation";
import {useMutation, useQuery} from "@tanstack/react-query";
import "@testing-library/jest-dom";
import {afterEach, expect} from "@jest/globals";
import * as WalletService from "@/services/walletService";

jest.mock("next/navigation");
jest.mock("@tanstack/react-query");
jest.mock("verified/src/services/walletService");
jest.mock("@tanstack/react-query")

beforeEach(() => {
    (useMutation as jest.Mock).mockReturnValue({
        mutate: jest.fn(),
    });
});

afterEach(() => {
    jest.clearAllMocks();
});

describe("createAttestation", () => {
    it("should render a form", async () => {
        // arrange
        (useSearchParams as jest.Mock).mockReturnValue({
            has: jest.fn().mockReturnValue(true),
            get: jest.fn().mockReturnValue(true),
        });

        (WalletService.connectWallet as jest.Mock).mockReturnValue(true);

        // act
        render(<Page />);

        // assert
        expect(await screen.findByLabelText("form-test")).toBeInTheDocument();
    });
    it("should redirect to /connectWallet if wallet is not connected", () => {
        // arrange
        (useSearchParams as jest.Mock).mockReturnValue({
            has: jest.fn().mockReturnValue(false),
            get: jest.fn().mockReturnValue(false),
        });

        (WalletService.isWalletConnected as jest.Mock).mockReturnValue(false);

        (usePathname as jest.Mock).mockReturnValue("/createAttestation");

        // act
        render(<Page />);

        // assert
        expect(redirect).toHaveBeenCalledWith("/connectWallet?redirect=/createAttestation");
    });
    it("should render a form with all attestation fields", async () => {
        // arrange
        (useSearchParams as jest.Mock).mockReturnValue({
            has: jest.fn(),
            get: jest.fn(),
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
        (useSearchParams as jest.Mock).mockReturnValue({
            has: jest.fn(),
            get: jest.fn(),
        });

        // act
        render(<Page />);

        // assert
        const button = await screen.findByRole("button", { name: "Create Attestation" });
        expect(button).toBeInTheDocument();
    });
    it("should render InputFile component", async () => {
        // arrange
        (useSearchParams as jest.Mock).mockReturnValue({
            has: jest.fn(),
            get: jest.fn(),
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