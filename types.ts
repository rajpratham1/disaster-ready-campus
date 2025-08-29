export enum Page {
    DASHBOARD = 'Dashboard',
    MODULES = 'Education Modules',
    DRILLS = 'Virtual Drills',
    CONTACTS = 'Emergency Contacts',
}

export enum DisasterType {
    EARTHQUAKE = 'Earthquake',
    FLOOD = 'Flood',
    FIRE = 'Fire',
    CYCLONE = 'Cyclone',
    TSUNAMI = 'Tsunami',
}

export const IndianStatesAndUTs = [
    "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", 
    "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", 
    "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", 
    "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", 
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", 
    "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
] as const;

export type Region = string;


export interface DrillOption {
    text: string;
    isCorrect: boolean;
    explanation: string;
}

export interface DrillScenario {
    scenario: string;
    question: string;
    options: DrillOption[];
}

export interface WeatherInfo {
    temperature: string;
    condition: string;
    humidity: string;
    wind: string;
}

export interface DrillHistoryItem {
    scenario: DrillScenario;
    selectedOption: DrillOption;
    isCorrect: boolean;
}