// this is the test
import {fileToByteArray, createHash} from "@/utils/fileHelpers";
import crypto from 'crypto';

jest.mock('crypto', () => {
    return{
        __esModule: true,
        default: jest.fn(() => 1)
    }
});


describe('fileHelpers', () => {
    it('should convert a file to a byte array', async () => {
        const file = new File(['hello'], 'hello.txt', {type: 'text/plain'});
        const byteArray = await fileToByteArray(file);
        expect(byteArray).toBeInstanceOf(Uint8Array);
        expect(byteArray).toHaveLength(5);
    });

    it('should create a hash from the byte array', async () => {
        const byteArray = new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0x6f]);
        const hash = await createHash(byteArray);
        expect(hash).toBe('68656c6c6f');
    });
});