type AttestationData = {
    recipientAddress: string, // The address of the recipient of the attestation
    universityName: string, // The name of the university
    facultyName: string, // The name of the faculty
    modeName: string, // The mode of the programme (full-time, part-time, etc.)
    typeName: string, // The type of the programme (bachelor, master, etc.)
    academicYear: string, // The academic year
    programmeName: string, // The name of the programme (SWI)
    fileHash: string // The hash of the file
};

type AttestationDataView = {
    uid: string, // The unique identifier of the attestation
    schema: string, // The schema of the attestation
    time: string, // The timestamp of the attestation
    attester: string, // The address of the attester
    recipientAddress: string, // The address of the recipient of the attestation
    universityName: string, // The name of the university
    facultyName: string, // The name of the faculty
    modeName: string, // The mode of the programme (full-time, part-time, etc.)
    typeName: string, // The type of the programme (bachelor, master, etc.)
    academicYear: string, // The academic year
    programmeName: string, // The name of the programme (SWI)
    fileHash: string // The hash of the file,
};


export type {AttestationData, AttestationDataView};