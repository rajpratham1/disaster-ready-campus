
import React, { useState } from 'react';
import { MegaphoneIcon, XMarkIcon } from './icons/Icons';

interface AlertBannerProps {
    message: string;
}

const AlertBanner: React.FC<AlertBannerProps> = ({ message }) => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) {
        return null;
    }

    return (
        <div className="bg-red-600 text-white p-4 flex items-center justify-between shadow-lg animate-pulse-slow">
            <div className="flex items-center">
                <MegaphoneIcon className="w-6 h-6 mr-3" />
                <span className="font-bold">ALERT:</span>
                <span className="ml-2">{message}</span>
            </div>
            <button onClick={() => setIsVisible(false)} className="hover:bg-red-700 p-1 rounded-full">
                <XMarkIcon className="w-5 h-5" />
            </button>
        </div>
    );
};

export default AlertBanner;
