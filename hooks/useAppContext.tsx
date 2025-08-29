
import { createContext, useContext } from 'react';
import { Page, DisasterType, Region } from '../types';

interface AppContextType {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
    completedModules: Set<DisasterType>;
    setCompletedModules: (modules: Set<DisasterType>) => void;
    drillPerformance: number;
    setDrillPerformance: (score: number) => void;
    preparednessScore: number;
    broadcastMessage: string;
    setBroadcastMessage: (message: string) => void;
    selectedLocation: string;
    setSelectedLocation: (location: string) => void;
    earthquakeAlert: boolean;
    setEarthquakeAlert: (showAlert: boolean) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
