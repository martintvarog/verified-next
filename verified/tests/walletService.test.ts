import {afterEach, beforeEach, describe, expect, it} from "@jest/globals";
import WalletService from "@/services/walletService";

let windowSpy: jest.SpyInstance;

beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
});

afterEach(() => {
    windowSpy.mockRestore();
});

describe('WalletService', () => {
    it('connectWallet', async () => {
        // arrange
        const ethereum = {
            request: jest.fn(),
        };
        windowSpy.mockImplementation(() => ({
            ethereum: ethereum
        }));

        ethereum.request.mockResolvedValueOnce(['0x1234']);

        // act
        const connected = await WalletService.connectWallet();

        // assert
        expect(connected).toBe(true);
        expect(ethereum.request).toHaveBeenCalledTimes(1);
        expect(ethereum.request).toHaveBeenCalledWith({method: 'eth_requestAccounts'});
    });

    it('connectWallet - no ethereum', async () => {
        // arrange
        windowSpy.mockImplementation(() => ({
            ethereum: undefined
        }));

        // act
        const connected = await WalletService.connectWallet();

        // assert
        expect(connected).toBe(false);
    });

    it('connectWallet - error', async () => {
        // arrange
        const ethereum = {
            request: jest.fn(),
        };
        windowSpy.mockImplementation(() => ({
            ethereum: ethereum
        }));

        ethereum.request.mockRejectedValueOnce('error');

        // act
        const connected = await WalletService.connectWallet();

        // assert
        expect(connected).toBe(false);
    });

    it('isWalletConnected', async () => {
        // arrange
        const ethereum = {
            request: jest.fn(),
        };
        windowSpy.mockImplementation(() => ({
            ethereum: ethereum
        }));

        ethereum.request.mockResolvedValueOnce(['0x1234']);

        // act
        const connected = await WalletService.isWalletConnected();

        // assert
        expect(connected).toBe(true);
        expect(ethereum.request).toHaveBeenCalledTimes(1);
        expect(ethereum.request).toHaveBeenCalledWith({method: 'eth_accounts'});
    });

    it('isWalletConnected - no ethereum', async () => {
        // arrange
        windowSpy.mockImplementation(() => ({
            ethereum: undefined
        }));

        // act
        const connected = await WalletService.isWalletConnected();

        // assert
        expect(connected).toBe(false);
    });

    it('isWalletConnected - error', async () => {
        // arrange
        const ethereum = {
            request: jest.fn(),
        };
        windowSpy.mockImplementation(() => ({
            ethereum: ethereum
        }));

        ethereum.request
            .mockRejectedValueOnce('error');

        // act
        const connected = await WalletService.isWalletConnected();

        // assert

        expect(connected).toBe(false);
    });
});