// this is the test
import {fileToByteArray, createHash} from "@/utils/fileHelpers";

jest.mock('crypto');

describe('fileHelpers', () => {
    it('should convert a file to a byte array', async () => {
        const file = new File(['hello'], 'hello.txt', {type: 'text/plain'});
        const byteArray = await fileToByteArray(file);
        expect(byteArray).toBeInstanceOf(Uint8Array);
        expect(byteArray).toHaveLength(5);
    });
});