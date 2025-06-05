"use client";

import { useEffect } from "react";

interface ErrorPopupProps {
    message: string;
    onClose: () => void;
}

export default function ErrorPopup({ message, onClose }: ErrorPopupProps) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
            {/* Backdrop with blur */}
            <div
                className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Error popup container */}
            <div className="relative bg-slate-800/95 border border-red-500/30 rounded-xl shadow-2xl backdrop-blur-md max-w-md w-full animate-fade-in-scale">
                {/* Error indicator bar */}
                <div className="h-1 bg-gradient-to-r from-red-500 to-red-400 rounded-t-xl" />

                {/* Content */}
                <div className="p-6">
                    {/* Header with icon */}
                    <div className="flex items-start space-x-4">
                        {/* Error icon */}
                        <div className="flex-shrink-0 w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>

                        {/* Message content */}
                        <div className="flex-1 min-w-0">
                            <h3 className="text-white font-semibold text-lg mb-1">Error</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">{message}</p>
                        </div>

                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 text-slate-400 hover:text-white transition-all duration-200 flex items-center justify-center group"
                        >
                            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Progress bar for auto-close */}
                    <div className="mt-4 h-1 bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full animate-progress-bar" />
                    </div>
                </div>
            </div>
        </div>
    );
}