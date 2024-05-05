// unittest for inputFile.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import { InputFile } from '@/components/inputFile';
import { fileToByteArray, createHash } from '@/utils/fileHelpers';
import {userEvent} from "@testing-library/user-event";

jest.mock('@/utils/fileHelpers', () => ({
  fileToByteArray: jest.fn(),
  createHash: jest.fn(),
}));

describe('InputFile', () => {
  it('should display an error alert when the file type is not a PDF', async () => {
    render(<InputFile onChange={jest.fn()} />);
    const input = screen.getByLabelText('Document');
    const file = new File([''], 'file.txt', { type: 'text/plain' });

    await userEvent.upload(input, file);

    expect(screen.getByText('Invalid file type. Please upload a PDF file'));
  });

  it('should call onChange with the hash of the file', async () => {
    const onChange = jest.fn();
    const hash = 'hash';
    const byteArray = new Uint8Array([0, 1, 2, 3]);

    (fileToByteArray as jest.Mock).mockResolvedValue(byteArray);
    (createHash as jest.Mock).mockResolvedValue(hash);

    render(<InputFile onChange={onChange} />);
    const input = screen.getByLabelText('Document');
    const file = new File([''], 'file.pdf', { type: 'application/pdf' });

    await userEvent.upload(input, file);

    expect(fileToByteArray).toHaveBeenCalledWith(file);
    expect(createHash).toHaveBeenCalledWith(byteArray);
    expect(onChange).toHaveBeenCalledWith(hash);
  });
});