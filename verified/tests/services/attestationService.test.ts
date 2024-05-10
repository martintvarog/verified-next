import * as AttestationService from "@/services/attestationService";
import {afterEach, beforeEach, describe, expect, it} from "@jest/globals";
import * as EASService from "@/services/easService";
import {AttestationData} from "@/types/attestationData";
import {SchemaEncoder} from "@ethereum-attestation-service/eas-sdk";

jest.mock('ethers');
jest.mock('verified/src/services/easService');
jest.mock('@ethereum-attestation-service/eas-sdk')


describe('attestationService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create attestation', async () => {
        // arrange
        const attestationData: AttestationData = {
            universityName: "universityName",
            facultyName: "facultyName",
            programmeName: "programmeName",
            typeName: "typeName",
            modeName: "modeName",
            academicYear: "academicYear",
            fileHash: "fileHash",
            recipientAddress: "recipientAddress"
        };

        const schemaEncoder = new SchemaEncoder("schema");
        const encodedData = schemaEncoder.encodeData([
            {name: "University_Name", value: attestationData.universityName, type: "string"},
            {name: "Faculty_Name", value: attestationData.facultyName, type: "string"},
            {name: "Programme_Name", value: attestationData.programmeName, type: "string"},
            {name: "Type_Name", value: attestationData.typeName, type: "string"},
            {name: "Mode_Name", value: attestationData.modeName, type: "string"},
            {name: "Academic_Year", value: attestationData.academicYear, type: "string"},
            {name: "File_Hash", value: attestationData.fileHash, type: "string"}
        ]);

        (EASService.getEASClient as jest.Mock).mockResolvedValue({
            attest: jest.fn().mockResolvedValue({
                wait: jest.fn().mockResolvedValue("attestationUID")
            })
        });

        // act
        const result = await AttestationService.createAttestation(attestationData);

        // assert
        expect(result).toBe("attestationUID");
    });
});
