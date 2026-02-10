
import React, { useEffect } from 'react';

export type ToastVariant = 'success' | 'error' | 'info';

interface ToastProps {
    message: string;
    variant?: ToastVariant;
    onClose: () => void;
    duration?: number; // Optional duration, default to 3000ms
}

export const Toast: React.FC<ToastProps> = ({
    message,
    variant = 'info',
    onClose,
    duration = 3000,
}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const getVariantClasses = () => {
        switch (variant) {
            case 'success':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'error':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'info':
            default:
                return 'bg-blue-100 text-blue-800 border-blue-200';
        }
    };

    return (
        <div
            role="alert"
            aria-live="assertive"
            className={`flex items-center justify-between px-4 py-3 rounded border mb-4 shadow-sm w-full max-w-sm ${getVariantClasses()}`}
        >
            <span className="flex-1">{message}</span>
            <button
                onClick={onClose}
                aria-label="Close"
                className="ml-4 bg-transparent hover:bg-black/5 rounded p-1 transition-colors"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </div>
    );
};
