
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Page, WeatherInfo } from '../types';
import { generateRegionalTips } from '../services/geminiService';
import { BellIcon, LightBulbIcon, SunIcon, CloudIcon, RainIcon, WindIcon, SparklesIcon, ExclamationTriangleIcon } from './icons/icons';

// Mock data for drill participation
const drillData = [
    { name: 'Jan', participation: 65 },
    { name: 'Feb', participation: 72 },
    { name: 'Mar', participation: 80 },
    { name: 'Apr', participation: 75 },
    { name: 'May', participation: 85 },
    { name: 'Jun', participation: 92 },
];

const WEATHER_API_KEY = 'f9e688285da0c955ec34db9ffea2871f';

const BroadcastAlertForm: React.FC = () => {
    const { setBroadcastMessage, setEarthquakeAlert } = useAppContext();
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setBroadcastMessage(message);
        setMessage('');
        setTimeout(() => setBroadcastMessage(''), 10000); // Clear after 10s
    };

    const handleSimulateEarthquake = () => {
        setEarthquakeAlert(true);
        setTimeout(() => setEarthquakeAlert(false), 15000); // Alert lasts for 15 seconds
    };

    return (
        <div className="space-y-4">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 items-center">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Broadcast an alert..."
                    className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none w-full"
                    aria-label="Alert message"
                />
                <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-semibold flex items-center justify-center w-full sm:w-auto">
                    <BellIcon className="w-5 h-5 mr-2" />
                    Send
                </button>
            </form>
            <div className="border-t pt-4">
                 <button 
                    onClick={handleSimulateEarthquake}
                    className="w-full px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 font-semibold flex items-center justify-center"
                >
                    <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
                    Simulate Earthquake Alert
                </button>
            </div>
        </div>
    );
}

const WeatherDisplay: React.FC<{ weather: WeatherInfo }> = ({ weather }) => {
    const getWeatherIcon = (condition: string) => {
        const lowerCaseCondition = condition.toLowerCase();
        if (lowerCaseCondition.includes('sun') || lowerCaseCondition.includes('clear')) return <SunIcon className="w-10 h-10 text-yellow-500" />;
        if (lowerCaseCondition.includes('cloud') || lowerCaseCondition.includes('overcast') || lowerCaseCondition.includes('haze')) return <CloudIcon className="w-10 h-10 text-gray-500" />;
        if (lowerCaseCondition.includes('rain') || lowerCaseCondition.includes('shower') || lowerCaseCondition.includes('drizzle')) return <RainIcon className="w-10 h-10 text-blue-500" />;
        return <CloudIcon className="w-10 h-10 text-gray-400" />;
    };

    return (
        <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-between mt-4">
            <div className="flex items-center">
                {getWeatherIcon(weather.condition)}
                <div className="ml-4">
                    <p className="font-bold text-xl text-gray-800">{weather.temperature}</p>
                    <p className="text-sm text-gray-600">{weather.condition}</p>
                </div>
            </div>
            <div className="text-right text-sm text-gray-600">
                <p>Humidity: {weather.humidity}</p>
                <p>Wind: {weather.wind}</p>
            </div>
        </div>
    );
};

const CityPreparednessWidget: React.FC = () => {
    const { selectedLocation, setSelectedLocation } = useAppContext();
    const [inputCity, setInputCity] = useState(selectedLocation);
    const [weatherData, setWeatherData] = useState<WeatherInfo | null>(null);
    const [tips, setTips] = useState<string[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async () => {
        if (!inputCity) {
            setError("Please enter a city name.");
            return;
        }
        setLoading(true);
        setError(null);
        setWeatherData(null);
        setTips(null);
        setSelectedLocation(inputCity);

        try {
            // 1. Fetch weather data from OpenWeatherMap
            const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${WEATHER_API_KEY}&units=metric`);
            if (!weatherResponse.ok) {
                const errorData = await weatherResponse.json();
                throw new Error(errorData.message || `Could not fetch weather for ${inputCity}.`);
            }
            const weatherJson = await weatherResponse.json();
            const fetchedWeather: WeatherInfo = {
                temperature: `${Math.round(weatherJson.main.temp)}°C`,
                condition: weatherJson.weather[0]?.main || 'N/A',
                humidity: `${weatherJson.main.humidity}%`,
                wind: `${weatherJson.wind.speed.toFixed(1)} m/s`,
            };
            setWeatherData(fetchedWeather);

            // 2. Generate tips based on fetched weather
            const generatedTipsData = await generateRegionalTips(inputCity, fetchedWeather);
            if (!generatedTipsData) {
                throw new Error("Could not generate AI-powered preparedness tips.");
            }
            setTips(generatedTipsData.tips);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSearch();
    };

    useEffect(() => {
        if (selectedLocation) {
            handleSearch();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Run once on initial load

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-2">City-Specific Preparedness</h3>
            <p className="text-gray-600 mb-4">Enter a location to get real-time disaster alerts and safety advice.</p>
            
            <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                    type="text"
                    value={inputCity}
                    onChange={(e) => setInputCity(e.target.value)}
                    placeholder="Enter your city..."
                    className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 text-gray-800"
                    aria-label="City name"
                />
                <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold disabled:bg-blue-300">
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>

            {loading && (
                <div className="flex justify-center items-center h-48">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            )}
            {error && <p className="text-red-500 text-center py-10 font-medium">{error}</p>}
            
            {!loading && !error && weatherData && tips && (
                 <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-lg font-bold text-gray-800">Live Report for {inputCity}</h4>
                        <span className="text-xs font-medium bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full flex items-center">
                            <SparklesIcon className="w-4 h-4 mr-1"/>
                            Weather-Aware Tips
                        </span>
                    </div>
                    <WeatherDisplay weather={weatherData} />
                    <ul className="space-y-3 mt-4">
                        {tips.map((tip, index) => (
                            <li key={index} className="flex items-start">
                                <LightBulbIcon className="w-5 h-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                                <span className="text-gray-600">{tip}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};


const MockNotifications: React.FC = () => {
    const { selectedLocation } = useAppContext();
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Notifications</h3>
            <ul className="space-y-3">
                <li className="flex items-start p-3 bg-blue-50 rounded-md">
                    <BellIcon className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Reminder: Check your emergency kit supplies this weekend.</span>
                </li>
                 <li className="flex items-start p-3 bg-yellow-50 rounded-md">
                    <LightBulbIcon className="w-5 h-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Weather advisory for {selectedLocation}: High winds expected tomorrow. Secure loose objects outdoors.</span>
                </li>
            </ul>
        </div>
    )
}

const Dashboard: React.FC = () => {
    const { preparednessScore, setCurrentPage } = useAppContext();

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Administrator Dashboard</h2>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
                    <h3 className="text-lg font-semibold text-gray-500 mb-2">Overall Preparedness Score</h3>
                    <div className={`text-6xl font-bold ${preparednessScore > 75 ? 'text-green-500' : preparednessScore > 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                        {preparednessScore}%
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center hover:bg-blue-50 cursor-pointer" onClick={() => setCurrentPage(Page.MODULES)}>
                    <h3 className="text-lg font-semibold text-gray-500 mb-2">Next Module</h3>
                    <p className="text-2xl font-bold text-blue-600">Introduction to Fire Safety</p>
                    <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold">
                        Start Learning
                    </button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center hover:bg-blue-50 cursor-pointer" onClick={() => setCurrentPage(Page.DRILLS)}>
                     <h3 className="text-lg font-semibold text-gray-500 mb-2">Next Virtual Drill</h3>
                    <p className="text-2xl font-bold text-blue-600">Earthquake Evacuation</p>
                    <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold">
                        Begin Drill
                    </button>
                </div>
            </div>

            {/* Drill Participation Chart and Regional Tips */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CityPreparednessWidget />
                 <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Drill Participation (Last 6 Months)</h3>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={drillData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="participation" fill="#3B82F6" name="Participation (%)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
             
             {/* Notifications and Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Broadcast Emergency Alert</h3>
                    <p className="text-gray-600 mb-4">Send a real-time alert or simulate a disaster event. Use with caution.</p>
                    <BroadcastAlertForm />
                </div>
                <MockNotifications />
            </div>
        </div>
    );
};

export default Dashboard;
