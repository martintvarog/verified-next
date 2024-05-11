import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import * as WalletService from "@/services/walletService";

let windowSpy: jest.SpyInstance;

beforeEach(() => {
  windowSpy = jest.spyOn(window, "window", "get");
});

afterEach(() => {
  windowSpy.mockRestore();
});

describe("WalletService", () => {
  describe("connectWallet", () => {
    it("connects wallet successfully", async () => {
      // arrange
      const ethereum = {
        request: jest.fn(),
      };
      windowSpy.mockImplementation(() => ({
        ethereum: ethereum,
      }));

      ethereum.request.mockResolvedValueOnce(["0x1234"]);

      // act
      await WalletService.connectWallet();

      // assert
      expect(ethereum.request).toHaveBeenCalledTimes(1);
      expect(ethereum.request).toHaveBeenCalledWith({
        method: "eth_requestAccounts",
      });
    });

    it("throws error when there is no wallet", async () => {
      // arrange
      windowSpy.mockImplementation(() => ({
        ethereum: undefined,
      }));

      // act
      const connectThatThrows = WalletService.connectWallet;

      // assert
      await expect(connectThatThrows()).rejects.toThrow();
    });

    it("throws when wallet fails to connect", async () => {
      // arrange
      const ethereum = {
        request: jest.fn(),
      };
      windowSpy.mockImplementation(() => ({
        ethereum,
      }));

      ethereum.request.mockRejectedValueOnce(new Error("error"));

      // act
      const connectThatThrows = WalletService.connectWallet;

      // assert
      expect(connectThatThrows()).rejects.toThrow();
    });
  });

  describe("isWalletConnected", () => {
    it("returns true when wallet is connected", () => {
      // arrange
      const ethereum = {
        selectedAddress: "0x1234",
      };
      windowSpy.mockImplementation(() => ({
        ethereum,
      }));

      // act
      const result = WalletService.isWalletConnected();

      // assert
      expect(result).toBe(true);
    });

    it("returns false when wallet is not connected", () => {
      // arrange
      const ethereum = {
        selectedAddress: undefined,
      };
      windowSpy.mockImplementation(() => ({
        ethereum,
      }));

      // act
      const result = WalletService.isWalletConnected();

      // assert
      expect(result).toBe(false);
    });
  });


  it("returns false when there is no wallet", () => {
    // arrange
    windowSpy.mockImplementation(() => ({
      ethereum: undefined,
    }));

    // act
    const result = WalletService.isWalletConnected();

    // assert
    expect(result).toBe(false);
  });
});

