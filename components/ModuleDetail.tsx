
import React, { useState, useEffect } from 'react';
import { DisasterType } from '../types';
import { useAppContext } from '../hooks/useAppContext';
import { generateModuleContent } from '../services/geminiService';
import { ArrowLeftIcon, CheckCircleIcon } from './icons/Icons';

interface ModuleDetailProps {
    moduleType: DisasterType;
    onBack: () => void;
}

const ModuleDetail: React.FC<ModuleDetailProps> = ({ moduleType, onBack }) => {
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const { completedModules, setCompletedModules } = useAppContext();
    const isCompleted = completedModules.has(moduleType);

    useEffect(() => {
        const fetchContent = async () => {
            setLoading(true);
            const generatedContent = await generateModuleContent(moduleType);
            setContent(generatedContent);
            setLoading(false);
        };
        fetchContent();
    }, [moduleType]);

    const handleComplete = () => {
        if (isCompleted) return;
        const newCompleted = new Set(completedModules);
        newCompleted.add(moduleType);
        setCompletedModules(newCompleted);
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg">
            <button
                onClick={onBack}
                className="flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-6"
            >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Back to Modules
            </button>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{moduleType} Preparedness</h2>
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
                     <p className="ml-4 text-gray-600">Generating educational content...</p>
                </div>
            ) : (
                <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: content }} />
            )}

            {!loading && (
                <div className="mt-8 pt-6 border-t">
                    <button
                        onClick={handleComplete}
                        disabled={isCompleted}
                        className={`px-8 py-3 rounded-lg font-bold text-white transition-colors flex items-center justify-center ${
                            isCompleted
                                ? 'bg-green-500 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {isCompleted ? (
                            <>
                                <CheckCircleIcon className="w-6 h-6 mr-2"/>
                                Module Completed
                            </>
                        ) : 'Mark as Complete'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ModuleDetail;
