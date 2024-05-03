//import {FileUploader} from "react-drag-drop-files";
//import {Dispatch, SetStateAction, useState} from "react";
import {useState} from "react";
import {fileToByteArray, createHash} from "@/utils/fileHelpers";
import {Input} from "@/components/ui/input";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {AlertCircle} from "lucide-react";


// const fileTypes = ["PDF"];

// export function DragDrop({setFileHash}: { setFileHash: Dispatch<SetStateAction<string>> }) {
//     const [uploadedFileName, setUploadedFileName] = useState<string | undefined>(undefined);
//
//     const handleChange = (file: File) => {
//         setUploadedFileName(file.name);
//         fileToByteArray(file).then((byteArray) => {
//             createHash(byteArray).then((hash) => {
//                 setFileHash(hash);
//             });
//         })
//     };
//
//     return (
//         <div className="App">
//             <FileUploader
//                 required={true}
//                 multiple={false}
//                 handleChange={handleChange}
//                 name="file"
//                 types={fileTypes}
//             />
//             <br/>
//             {uploadedFileName ? <p>Uploaded file name: {uploadedFileName}</p> : null}
//
//         </div>
//     );
// }

type Props = {
    onChange: (hash: string) => void;
}
export function InputFile({onChange}: Props) {
    const [displayAlert, setDisplayAlert] = useState<boolean>(false);


    const handleChange = (file: File) => {
        if (file.type !== 'application/pdf') {
            setDisplayAlert(true);
            setTimeout(() => {
                setDisplayAlert(false);
            }, 2000);
            return;
        }

        fileToByteArray(file).then((byteArray) => {
            createHash(byteArray).then((hash) => {
                onChange(hash);
                console.log(hash);
            });
        })
    };


    return (
        <div>

            {displayAlert ?
                (<Alert variant="destructive" className={displayAlert ? "fade" : ""}>
                    <AlertCircle className="h-4 w-4"/>
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        Invalid file type. Please upload a PDF file
                    </AlertDescription>
                </Alert>) :

                <div className="grid w-full max-w-md items-center gap-2 text-white">


                    <label htmlFor="pdf" className="text-lg font-bold">Document</label>
                    <Input
                        id="pdf"
                        className="text-white bg-gray-800 focus:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md"
                        type="file"
                        onChange={(e) => handleChange(e.target.files![0])}
                        accept={"application/pdf"}
                        required={true}
                    />
                </div>
            }
        </div>
    )
}