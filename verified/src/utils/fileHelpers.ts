function fileToByteArray(file: File): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.result instanceof ArrayBuffer) {
                const arrayBuffer = reader.result;
                const byteArray = new Uint8Array(arrayBuffer);
                resolve(byteArray);
            } else {
                reject(new Error("Failed to read file as ArrayBuffer"));
            }
        };
        reader.onerror = () => {
            reject(new Error("Error reading file"));
        };
        reader.readAsArrayBuffer(file);
    });
}

async function createHash(byteArray: Uint8Array): Promise<string> {
    const buffer = await crypto.subtle.digest('SHA-256', byteArray.buffer);

    const hashArray = Array.from(new Uint8Array(buffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}


export {fileToByteArray, createHash};
