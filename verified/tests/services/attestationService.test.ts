import AttestationService from "@/services/attestationService";
import {afterEach, beforeEach, describe, expect, it} from "@jest/globals";

let easSpy : jest.SpyInstance;

afterEach(() => {
    jest.clearAllMocks();
});

describe('attestationService', () => {
    it('getAttestation', async () => {
        // arrange
        const eas = {
            getAttestation: jest.fn(),
        };
        easSpy.mockImplementation(() => ({
            eas: eas
        }));

        eas.getAttestation.mockResolvedValueOnce(['0x1234']);

        // act
        const attestation = await AttestationService.getAttestation('0x1234');

        // assert
        expect(attestation).toBe(true);
        expect(eas.getAttestation).toHaveBeenCalledTimes(1);
        expect(eas.getAttestation).toHaveBeenCalledWith('0x1234');
    });

    it('getAttestation - no eas', async () => {
        // arrange
        easSpy.mockImplementation(() => ({
            eas: undefined
        }));

        // act
        const attestation = await AttestationService.getAttestation('0x1234');

        // assert
        expect(attestation).toBe(undefined);
    });

    it('getAttestation - error', async () => {
        // arrange
        const eas = {
            getAttestation: jest.fn(),
        };
        easSpy.mockImplementation(() => ({
            eas: eas
        }));

        eas.getAttestation.mockRejectedValueOnce('error');

        // act
        const attestation = await AttestationService.getAttestation('0x1234');

        // assert
        expect(attestation).toBe(undefined);
    });
});