import React from "react";

interface VerificationStatusProps {
    verified: boolean;
}

const VerificationStatus: React.FC<VerificationStatusProps> = ({ verified }) => {
    const color = verified ? 'text-green-500' : 'text-red-500';
    return (
        <div className="flex items-center">
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