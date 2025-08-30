import React from 'react';
import { ExclamationTriangleIcon } from './icons/icons';

const EarthquakeAlertBanner: React.FC = () => {
    return (
        <div className="bg-yellow-400 border-l-4 border-yellow-700 text-yellow-900 p-4 flex items-center justify-center shadow-lg" role="alert">
            <ExclamationTriangleIcon className="w-8 h-8 mr-4 flex-shrink-0" />
            <div className="text-center">
                <p className="font-bold text-lg">EARTHQUAKE ALERT</p>
                <p className="text-sm">A seismic event has been detected. DROP, COVER, and HOLD ON. Avoid windows and move to a safe location.</p>
            </div>
        </div>
    );
};

export default EarthquakeAlertBanner;
