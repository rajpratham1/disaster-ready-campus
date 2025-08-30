
import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import EducationModules from './components/EducationModules';
import VirtualDrill from './components/VirtualDrill';
import EmergencyContacts from './components/EmergencyContacts';
import { AppContext } from './hooks/useAppContext';
import { Page, DisasterType } from './types';
import AlertBanner from './components/AlertBanner';
import EarthquakeAlertBanner from './components/EarthquakeAlertBanner';
import { HomeIcon, BookOpenIcon } from './components/icons/icons.tsx';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>(Page.DASHBOARD);
    const [completedModules, setCompletedModules] = useState<Set<DisasterType>>(() => {
        const saved = localStorage.getItem('completedModules');
        return saved ? new Set(JSON.parse(saved)) : new Set();
    });
    const [drillPerformance, setDrillPerformance] = useState<number>(0);
    const [broadcastMessage, setBroadcastMessage] = useState<string>('');
    const [selectedLocation, setSelectedLocation] = useState<string>(() => {
        return localStorage.getItem('selectedLocation') || 'Delhi';
    });
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [earthquakeAlert, setEarthquakeAlert] = useState(false);

    const preparednessScore = useMemo(() => {
        const moduleScore = (completedModules.size / Object.keys(DisasterType).length) * 50;
        const drillScore = drillPerformance;
        return Math.round(moduleScore + drillScore);
    }, [completedModules, drillPerformance]);

    useEffect(() => {
        localStorage.setItem('completedModules', JSON.stringify(Array.from(completedModules)));
    }, [completedModules]);
    
    useEffect(() => {
        localStorage.setItem('selectedLocation', selectedLocation);
    }, [selectedLocation]);

    const contextValue = {
        currentPage,
        setCurrentPage,
        completedModules,
        setCompletedModules,
        drillPerformance,
        setDrillPerformance,
        preparednessScore,
        broadcastMessage,
        setBroadcastMessage,
        selectedLocation,
        setSelectedLocation,
        earthquakeAlert,
        setEarthquakeAlert,
    };

    const renderPage = () => {
        switch (currentPage) {
            case Page.DASHBOARD:
                return <Dashboard />;
            case Page.MODULES:
                return <EducationModules />;
            case Page.DRILLS:
                return <VirtualDrill />;
            case Page.CONTACTS:
                return <EmergencyContacts />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <AppContext.Provider value={contextValue}>
            <div className={`flex h-screen bg-gray-100 text-gray-800 ${earthquakeAlert ? 'animate-shake' : ''}`}>
                <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
                <main className="flex-1 flex flex-col overflow-hidden">
                    {/* Mobile Header */}
                    <div className="md:hidden flex justify-between items-center bg-white p-4 border-b shadow-sm">
                        <div className="flex items-center">
                            <ShieldCheckIcon className="w-8 h-8 text-blue-600" />
                            <h1 className="ml-2 text-xl font-bold text-gray-800">Disaster Ready</h1>
                        </div>
                        <button onClick={() => setSidebarOpen(true)} aria-label="Open menu">
                            <MenuIcon className="w-6 h-6" />
                        </button>
                    </div>

                    {earthquakeAlert && <EarthquakeAlertBanner />}
                    {broadcastMessage && <AlertBanner message={broadcastMessage} />}
                    <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 sm:p-8">
                        {renderPage()}
                    </div>
                </main>
                <a
                    href="https://gemini.google.com/app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ai-link fixed bottom-4 right-4 z-50 bg-white py-1 px-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
                    aria-label="Powered by AI"
                >
                    <span className="ai-text text-xs font-semibold text-gray-700">
                        ai ✨
                    </span>
                </a>
            </div>
        </AppContext.Provider>
    );
};

export default App;
