import { useId, useState } from "react";
import { fileToByteArray, createHash } from "@/utils/fileHelpers";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  name?: string;
  onChange: (hash: string) => void;
  className?: string;
};

export function InputFile({ onChange, className, name }: Props) {
  const [displayAlert, setDisplayAlert] = useState<boolean>(false);

  const handleChange = async (file: File) => {
    if (file.type !== "application/pdf") {
      setDisplayAlert(true);
      setTimeout(() => {
        setDisplayAlert(false);
      }, 2000);
      return;
    }

    const byteArray = await fileToByteArray(file);
    const hash = await createHash(byteArray);
    onChange(hash);
    console.log(hash);
  };

  const id = useId();

  return (
      <>
        {displayAlert ? (
            <Alert
                variant="destructive"
                className={cn(displayAlert && "fade", className)}
            >
              <AlertCircle className="size-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Invalid file type. Please upload a PDF file
              </AlertDescription>
            </Alert>
        ) : (
            <Input
                id={id}
                name={name}
                className={cn(
                    "text-inherit bg-gray-800 block w-full shadow-sm rounded-md",
                    "focus:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500",
                    className,
                )}
                type="file"
                onChange={(e) => handleChange(e.target.files![0])}
                accept={"application/pdf"}
            />
        )}
      </>
  );
}
