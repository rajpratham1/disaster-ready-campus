
import React, { useState } from 'react';
import { DisasterType } from '../types';
import { useAppContext } from '../hooks/useAppContext';
import ModuleDetail from './ModuleDetail';
import { EarthquakeIcon, FireIcon, FloodIcon, CycloneIcon, CheckCircleIcon, TsunamiIcon } from './icons/icons';

const disasterInfo = {
    [DisasterType.EARTHQUAKE]: { icon: <EarthquakeIcon />, description: "Learn how to prepare for and react during an earthquake.", color: "bg-yellow-500" },
    [DisasterType.FLOOD]: { icon: <FloodIcon />, description: "Understand flood risks and safety measures to protect yourself.", color: "bg-blue-500" },
    [DisasterType.FIRE]: { icon: <FireIcon />, description: "Essential fire safety knowledge for prevention and emergency response.", color: "bg-red-500" },
    [DisasterType.CYCLONE]: { icon: <CycloneIcon />, description: "Prepare for tropical cyclones and strong winds to ensure safety.", color: "bg-indigo-500" },
    [DisasterType.TSUNAMI]: { icon: <TsunamiIcon />, description: "Crucial for coastal areas. Learn warning signs and evacuation protocols.", color: "bg-teal-500" },
};

const EducationModules: React.FC = () => {
    const [selectedModule, setSelectedModule] = useState<DisasterType | null>(null);
    const { completedModules } = useAppContext();
    const totalModules = Object.values(DisasterType).length;
    const completedCount = completedModules.size;
    const completionPercentage = Math.round((completedCount / totalModules) * 100);

    if (selectedModule) {
        return <ModuleDetail moduleType={selectedModule} onBack={() => setSelectedModule(null)} />;
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-gray-900">Education Modules</h2>
                <p className="text-lg text-gray-600 mt-2">
                    Knowledge is the first step towards safety. Select a module below to learn about different types of disasters.
                </p>
            </div>
            
            {/* Progress Bar */}
            <div>
                <div className="flex justify-between mb-1">
                    <span className="text-base font-medium text-blue-700">Completion Progress</span>
                    <span className="text-sm font-medium text-blue-700">{completionPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${completionPercentage}%` }}></div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.values(DisasterType).map((type) => (
                    <div
                        key={type}
                        className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
                        onClick={() => setSelectedModule(type)}
                    >
                        <div className={`h-32 flex items-center justify-center ${disasterInfo[type].color}`}>
                            {React.cloneElement(disasterInfo[type].icon, { className: 'w-16 h-16 text-white' })}
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                                {type}
                                {completedModules.has(type) && <CheckCircleIcon className="w-6 h-6 text-green-500 ml-2" />}
                            </h3>
                            <p className="text-gray-600">{disasterInfo[type].description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EducationModules;
