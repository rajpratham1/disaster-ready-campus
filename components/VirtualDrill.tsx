import React, { useState, useEffect } from 'react';
import { DisasterType, DrillScenario, DrillOption, DrillHistoryItem } from '../types';
import { generateDrillScenario, generateDrillFeedback } from '../services/geminiService';
import { useAppContext } from '../hooks/useAppContext';
import { ClipboardDocumentListIcon, CheckCircleIcon, XCircleIcon } from './icons/Icons';

const DRILL_LENGTH = 5;

const DrillSummary: React.FC<{
    history: DrillHistoryItem[];
    feedback: string | null;
    loading: boolean;
    disasterType: DisasterType;
    score: number;
    onRetake: () => void;
    onChooseAnother: () => void;
}> = ({ history, feedback, loading, disasterType, score, onRetake, onChooseAnother }) => {

    const correctAnswers = history.filter(h => h.isCorrect).length;
    const totalQuestions = history.length;
    const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center">Drill Performance Review: {disasterType}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <ClipboardDocumentListIcon className="w-6 h-6 mr-2 text-blue-600" />
                        AI-Powered Feedback
                    </h3>
                    {loading ? (
                         <div className="flex items-center text-gray-600">
                             <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
                             Generating your personalized feedback...
                         </div>
                    ) : (
                         <div className="prose prose-sm text-gray-700" dangerouslySetInnerHTML={{ __html: feedback || '' }} />
                    )}
                 </div>
                 <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Your Score</h3>
                     <div className="text-center">
                         <p className="text-6xl font-bold text-blue-600">{score}</p>
                         <p className="text-lg text-gray-600 mt-1">{accuracy}% Accuracy</p>
                         <p className="text-sm text-gray-500">({correctAnswers} out of {totalQuestions} correct)</p>
                     </div>
                 </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Detailed Review</h3>
                <div className="space-y-6">
                    {history.map((item, index) => (
                        <div key={index} className="border-t pt-4">
                            <p className="font-semibold text-gray-700">Q{index + 1}: {item.scenario.question}</p>
                            <div className={`mt-2 p-3 rounded-lg flex items-start ${item.isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                                {item.isCorrect ? <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0"/> : <XCircleIcon className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0"/>}
                                <div>
                                    <p className="text-gray-800">Your answer: <span className="font-medium">{item.selectedOption.text}</span></p>
                                    {!item.isCorrect && (
                                        <p className="text-gray-800">Correct answer: <span className="font-medium text-green-700">{item.scenario.options.find(o => o.isCorrect)?.text}</span></p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center gap-4 pt-4">
                <button onClick={onRetake} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:-translate-y-0.5">
                    Retake {disasterType} Drill
                </button>
                <button onClick={onChooseAnother} className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-transform transform hover:-translate-y-0.5">
                    Choose Another Drill
                </button>
            </div>
        </div>
    );
};


const VirtualDrill: React.FC = () => {
    const [selectedDisaster, setSelectedDisaster] = useState<DisasterType | null>(null);
    const [drill, setDrill] = useState<DrillScenario | null>(null);
    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState<DrillOption | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    
    // Gamification state
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [pointsAwarded, setPointsAwarded] = useState<number | null>(null);

    const { setDrillPerformance } = useAppContext();

    const [drillHistory, setDrillHistory] = useState<DrillHistoryItem[]>([]);
    const [scenarioCount, setScenarioCount] = useState(0);
    const [drillEnded, setDrillEnded] = useState(false);
    const [feedbackSummary, setFeedbackSummary] = useState<string | null>(null);
    const [loadingFeedback, setLoadingFeedback] = useState(false);

    const loadScenario = async (disaster: DisasterType) => {
        setLoading(true);
        setDrill(null);
        setSelectedOption(null);
        setShowExplanation(false);
        setPointsAwarded(null);
        const scenario = await generateDrillScenario(disaster);
        setDrill(scenario);
        setLoading(false);
    };

    const handleStartDrill = (disaster: DisasterType) => {
        setSelectedDisaster(disaster);
        setDrillHistory([]);
        setScenarioCount(0);
        setDrillEnded(false);
        setFeedbackSummary(null);
        setScore(0);
        setStreak(0);
        setPointsAwarded(null);
        setDrillPerformance(0);
        loadScenario(disaster);
    };

    const handleOptionSelect = (option: DrillOption) => {
        if (showExplanation) return;
        setSelectedOption(option);
        setShowExplanation(true);
        const isCorrect = option.isCorrect;

        if (isCorrect) {
            const basePoints = 100;
            const bonusPoints = streak * 10;
            const totalPoints = basePoints + bonusPoints;
            setScore(prev => prev + totalPoints);
            setPointsAwarded(totalPoints);
            setStreak(prev => prev + 1);
        } else {
            setStreak(0);
            setPointsAwarded(0);
        }

        if (drill) {
            setDrillHistory(prev => [...prev, {
                scenario: drill,
                selectedOption: option,
                isCorrect: isCorrect
            }]);
        }
        setScenarioCount(prev => prev + 1);
    };
    
    const handleNextScenario = () => {
        if(selectedDisaster) {
            loadScenario(selectedDisaster);
        }
    }

    const handleFinishDrill = async () => {
        // Update global preparedness score
        const correctAnswers = drillHistory.filter(h => h.isCorrect).length;
        const accuracy = drillHistory.length > 0 ? (correctAnswers / drillHistory.length) : 0;
        const drillScoreContribution = accuracy * 50; // Max 50 points
        setDrillPerformance(drillScoreContribution);

        // Fetch AI feedback
        setDrillEnded(true);
        setLoadingFeedback(true);
        const feedback = await generateDrillFeedback(drillHistory);
        setFeedbackSummary(feedback);
        setLoadingFeedback(false);
    };

    const handleChooseAnother = () => {
        setSelectedDisaster(null);
        setDrillEnded(false);
    }

    const getOptionClasses = (option: DrillOption) => {
        if (!showExplanation) {
            return 'bg-white hover:bg-gray-100';
        }
        if (option.isCorrect) {
            return 'bg-green-100 border-green-500 ring-2 ring-green-500';
        }
        if (option === selectedOption && !option.isCorrect) {
            return 'bg-red-100 border-red-500 ring-2 ring-red-500';
        }
        return 'bg-gray-50';
    };

    if (drillEnded && selectedDisaster) {
        return <DrillSummary 
            history={drillHistory} 
            feedback={feedbackSummary} 
            loading={loadingFeedback}
            disasterType={selectedDisaster}
            score={score}
            onRetake={() => handleStartDrill(selectedDisaster)}
            onChooseAnother={handleChooseAnother}
        />
    }

    if (!selectedDisaster) {
        return (
            <div className="space-y-6 text-center">
                <h2 className="text-3xl font-bold text-gray-900">Virtual Drills</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Test your knowledge in a simulated environment. Each drill consists of {DRILL_LENGTH} scenarios. Choose a disaster type to begin.
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                    {Object.values(DisasterType).map(type => (
                        <button
                            key={type}
                            onClick={() => handleStartDrill(type)}
                            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:-translate-y-1"
                        >
                            Start {type} Drill
                        </button>
                    ))}
                </div>
            </div>
        );
    }
    
    return (
        <div className="max-w-4xl mx-auto">
             <div className="flex justify-between items-center mb-6">
                <button
                    onClick={handleChooseAnother}
                    className="text-blue-600 hover:underline font-semibold"
                >
                    &larr; Choose a different drill
                </button>
                <div className="text-right">
                    <p className="font-bold text-2xl text-blue-600">Score: {score}</p>
                    <div className="flex items-center justify-end space-x-4">
                        <p className="font-semibold text-gray-600">Question: {scenarioCount + 1} / {DRILL_LENGTH}</p>
                        <p className="font-semibold text-yellow-600">Streak: {streak} 🔥</p>
                    </div>
                </div>
             </div>
            <div className="bg-white p-8 rounded-xl shadow-2xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedDisaster} Drill Scenario</h2>
                {loading && (
                    <div className="text-center py-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Generating scenario...</p>
                    </div>
                )}
                {drill && (
                    <div className="space-y-6">
                        <p className="text-lg bg-gray-100 p-4 rounded-lg text-gray-700 italic">"{drill.scenario}"</p>
                        <h3 className="text-xl font-semibold text-gray-800">{drill.question}</h3>
                        <div className="space-y-4">
                            {drill.options.map((option, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleOptionSelect(option)}
                                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 ${getOptionClasses(option)}`}
                                >
                                    <p className="font-medium text-gray-900">{option.text}</p>
                                    {showExplanation && (
                                        <p className={`mt-2 text-sm font-semibold ${option.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                                            {option.explanation}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                        {showExplanation && (
                            <div className="text-center pt-4 space-y-4">
                                <div>
                                    {pointsAwarded !== null && pointsAwarded > 0 ? (
                                        <div className="p-3 bg-green-50 rounded-lg inline-block">
                                            <p className="text-xl font-bold text-green-600">+{pointsAwarded} Points!</p>
                                            {streak > 1 && <p className="text-sm text-yellow-600 font-semibold">Streak Bonus: +{(streak - 1) * 10}</p>}
                                        </div>
                                    ) : (
                                         <div className="p-3 bg-red-50 rounded-lg inline-block">
                                            <p className="text-xl font-bold text-red-600">Incorrect</p>
                                         </div>
                                    )}
                                </div>
                                {scenarioCount < DRILL_LENGTH ? (
                                    <button
                                        onClick={handleNextScenario}
                                        className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
                                    >
                                        Next Scenario &rarr;
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleFinishDrill}
                                        className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:scale-105"
                                    >
                                        View Drill Summary
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                )}
                {!loading && !drill && <p className="text-red-500 text-center py-10">Could not load drill scenario. Please try again.</p>}
            </div>
        </div>
    );
};

export default VirtualDrill;