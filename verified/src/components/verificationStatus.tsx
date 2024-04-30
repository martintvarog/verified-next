import { cn } from "@/lib/utils";


interface VerificationStatusProps {
  verified: boolean;
  className?: string;
}

const VerificationStatus: React.FC<VerificationStatusProps> = ({ verified, className }) => {
    const color = verified ? 'text-green-500' : 'text-red-500';
    return (
        <div className={ cn("flex items-center", className) }>
            <div className={`${color} text-4xl mr-2`}>
                {verified ? <span>&#10003;</span>: <span>&#10005;</span>}
            </div>
            <div className={`${color} text-2xl`}>
                {verified ? 'Verified' : 'Not Verified'}
            </div>
        </div>
    );
};

export default VerificationStatus;
