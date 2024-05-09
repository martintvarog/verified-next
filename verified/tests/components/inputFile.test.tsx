// unittest for inputFile.tsx

import React from 'react';
import {render, screen} from '@testing-library/react';
import {InputFile} from '@/components/inputFile';
import {fileToByteArray, createHash} from '@/utils/fileHelpers';
import {userEvent} from "@testing-library/user-event";

jest.mock('verified/src/utils/fileHelpers', () => ({
    fileToByteArray: jest.fn(),
    createHash: jest.fn(),
}));

describe('InputFile', () => {
    it('should call onChange with the hash of the file', async () => {
        // Arrange
        const onChange = jest.fn();
        const hash = 'hash';
        const byteArray = new Uint8Array([0, 1, 2, 3]);

        (fileToByteArray as jest.Mock).mockResolvedValue(byteArray);
        (createHash as jest.Mock).mockResolvedValue(hash);

        // Act
        render(<InputFile onChange={onChange}/>);
        const input = screen.getByLabelText('Document');
        const file = new File([''], 'file.pdf', {type: 'application/pdf'});

        await userEvent.upload(input, file);

        // Assert
        expect(fileToByteArray).toHaveBeenCalledWith(file);
        expect(createHash).toHaveBeenCalledWith(byteArray);
        expect(onChange).toHaveBeenCalledWith(hash);
    });
});
