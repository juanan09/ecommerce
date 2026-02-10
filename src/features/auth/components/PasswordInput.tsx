import React, { useState } from 'react';
import { validatePassword } from '@/shared/utils/validatePassword';

interface PasswordInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    showRequirements?: boolean;
    disabled?: boolean;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
    value,
    onChange,
    showRequirements = false,
    disabled = false,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [touched, setTouched] = useState(false);
    const { strength, isValid } = validatePassword(value);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const getStrengthColor = (s: 'weak' | 'medium' | 'strong') => {
        switch (s) {
            case 'weak':
                return 'bg-red-500';
            case 'medium':
                return 'bg-yellow-500';
            case 'strong':
                return 'bg-green-500';
            default:
                return 'bg-gray-200';
        }
    };

    const getStrengthLabel = (s: 'weak' | 'medium' | 'strong') => {
        switch (s) {
            case 'strong':
                return 'Strong';
            case 'medium':
                return 'Medium';
            default:
                return 'Weak';
        }
    };

    const requirements = [
        { label: 'At least 12 characters', test: value.length >= 12 },
        { label: 'At least one uppercase letter', test: /[A-Z]/.test(value) },
        { label: 'At least one lowercase letter', test: /[a-z]/.test(value) },
        { label: 'At least one number', test: /[0-9]/.test(value) },
        { label: 'At least one special character', test: /[!@#$%^&*(),.?":{}|<>]/.test(value) },
    ];

    const getStrengthWidth = (s: 'weak' | 'medium' | 'strong') => {
        switch (s) {
            case 'weak':
                return '33%';
            case 'medium':
                return '66%';
            case 'strong':
                return '100%';
            default:
                return '0%';
        }
    };

    return (
        <div className="w-full">
            <div className="relative">
                {/* ... input and button elements ... */}
                <input
                    type={showPassword ? 'text' : 'password'}
                    value={value}
                    onChange={onChange}
                    onBlur={() => setTouched(true)}
                    disabled={disabled}
                    aria-label="Password"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${touched && !isValid ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`}
                    placeholder="Enter password"
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    disabled={disabled}
                    aria-label={showPassword ? 'Hide content' : 'Show content'}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    )}
                </button>
            </div>

            <div className="mt-2 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                    className={`h-full transition-all duration-300 ${getStrengthColor(strength)}`}
                    style={{ width: getStrengthWidth(strength) }}
                />
            </div>
            <p className="text-xs mt-1 text-right text-gray-600">
                Strength: <span className="font-medium">{getStrengthLabel(strength)}</span>
            </p>

            {showRequirements && (
                <ul className="mt-3 space-y-1 text-sm">
                    {requirements.map((req, index) => (
                        <li key={index} className={`flex items-center space-x-2 ${req.test ? 'text-green-600' : 'text-red-500'}`}>
                            <span>{req.test ? '✓' : '✗'}</span>
                            <span>{req.label}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
