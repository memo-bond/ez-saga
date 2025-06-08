"use client"

import React from "react";
import clsx from "clsx";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    className?: string;
}

export const InputField = ({ label, className, readOnly, ...props }: InputFieldProps) => (
    <div>
        {label && <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>}
        <input
            {...props}
            readOnly={readOnly}
            className={clsx(
                "w-full px-4 py-3 rounded-lg transition-all duration-200",
                "text-white placeholder-gray-400",
                "border border-white/10",
                "bg-slate-800/50 focus:ring-2 focus:border-transparent",
                props.type === "text" && "font-mono",
                readOnly &&
                "cursor-not-allowed opacity-70 bg-gradient-to-r from-slate-800 to-slate-700 border-white/20 shadow-inner",
                className
            )}
        />
    </div>
);


interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    className?: string;
}

export const TextAreaField = ({ label, className, ...props }: TextAreaFieldProps) => (
    <div>
        {label && <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>}
        <textarea
            {...props}
            className={clsx(
                "w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg " +
                "text-white placeholder-gray-400 focus:ring-2 focus:border-transparent transition-all duration-200 resize-none",
                className
            )}
        />
    </div>
);


interface ToggleCheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    color?: "green" | "blue" | "red";
    className?: string;
}

export const ToggleCheckbox = ({ checked, onChange, label, color = "green", className }: ToggleCheckboxProps) => {
    const bgColor = checked ? `bg-${color}-500 border-${color}-500` : "border-gray-400 bg-transparent";
    return (
        <label className={"flex items-center gap-3 cursor-pointer group " + className}>
            <div className="relative">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    className="sr-only"
                />
                <div className={`w-6 h-6 rounded-md border-2 transition-all duration-200 ${bgColor}`}>
                    {checked && (
                        <svg className="w-4 h-4 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    )}
                </div>
            </div>
            <span className="text-white font-medium group-hover:text-green-400 transition-colors">{label}</span>
        </label>
    );
};


interface SectionHeaderProps {
    title: string;
    colorClass: string; // e.g., 'text-cyan-400 border-cyan-400/30'
}

export const SectionHeader = ({ title, colorClass }: SectionHeaderProps) => (
    <h3 className={`text-lg font-semibold pb-2 border-b ${colorClass}`}>{title}</h3>
);


interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export const PrimaryButton = ({ children, ...props }: PrimaryButtonProps) => (
    <button
        {...props}
        // className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
        className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 shadow-md"
    >
        {children}
    </button>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export const Button = ({ children, ...props }: ButtonProps) => (
    <button
        {...props}
        className="px-6 py-2.5 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200"
    >
        {children}
    </button>
);


interface ModalWrapperProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ModalWrapper = ({ open, onClose, children }: ModalWrapperProps) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 w-full max-w-4xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                {children}
            </div>
        </div>
    );
};
