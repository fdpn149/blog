import React from 'react';
import { ArrowRight } from 'lucide-react';

const ContentPanel = ({ station, isLastStation, onNext }) => {
    return (
        <div className="flex flex-col h-full bg-white dark:bg-[#1a1a1a] border-l border-gray-200 dark:border-gray-800 overflow-hidden">
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-white dark:from-[#1a1a1a] dark:to-[#1a1a1a]">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
                    {station.title}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    {station.description}
                </p>
            </div>

            {/* Main Content Body - REMOVED max-w constraints and reduced padding */}
            <div className="flex-1 p-6 md:p-8 overflow-y-auto">
                <div className="prose prose-blue dark:prose-invert max-w-none">
                    {/* Render the component if it exists */}
                    {station.component ? station.component : (
                        <>
                            <p>
                                Welcome to the <strong>{station.title}</strong> module.
                            </p>
                            <p>
                                (Placeholder content or description)
                            </p>
                        </>
                    )}
                </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 bg-gray-50 dark:bg-[#1a1a1a] border-t border-gray-200 dark:border-gray-800 flex justify-end items-center sticky bottom-0">
                {!isLastStation && (
                    <button
                        onClick={onNext}
                        className="bg-black hover:bg-gray-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg flex items-center transform transition-transform active:scale-95 cursor-pointer"
                    >
                        Next Station
                        <ArrowRight size={18} className="ml-2" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ContentPanel;
