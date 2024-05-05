import AttestationService from "@/services/attestationService";
import {afterEach, beforeEach, describe, expect, it} from "@jest/globals";
import {ConfiguredEAS} from "@/services/configureEAS";

jest.mock('ethers');
jest.mock('verified/src/services/configureEAS');
jest.mock('@ethereum-attestation-service/eas-sdk')


describe('attestationService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call getAttestation', async () => {
        // arrange
        const transactionUID = 'transactionUID';
        const expected = {
            transactionUID,
            data: 'data'
        };

        (ConfiguredEAS.configureEAS as jest.Mock).mockResolvedValue({
            getAttestation: jest.fn().mockResolvedValue(expected)
        });

        // act
        const result = await AttestationService.getAttestation(transactionUID);

        // assert
        expect(result).toEqual(expected);
    });
});