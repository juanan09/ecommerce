
import React, { useState } from 'react';
import * as Sentry from '@sentry/react';
import { PasswordInput } from './components/PasswordInput';
import { validatePassword } from '@/shared/utils/validatePassword';

export const LoginDemo: React.FC = () => {
    const [email, setEmail] = useState('');
    const [emailTouched, setEmailTouched] = useState(false);
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'locked'>('idle');
    const [attempts, setAttempts] = useState(0);
    const [message, setMessage] = useState('');

    const maxAttempts = 3;

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = validatePassword(password).isValid;
    const isFormValid = isEmailValid && isPasswordValid && status !== 'locked';

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (status === 'locked') return;

        // Simulate API call check
        // In a real app, this would be a server response
        if (email === 'demo@example.com' && isPasswordValid) {
            setStatus('success');
            setMessage('Login successful!');
            setAttempts(0);

            Sentry.setUser({
                email: email,
                id: 'demo-user-123',
            });
        } else {
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);

            if (newAttempts >= maxAttempts) {
                setStatus('locked');
                setMessage('Form locked due to too many failed attempts.');
            } else {
                setStatus('error');
                setMessage('Invalid credentials. Please try again.');
            }
        }
    };

    const handleLogout = () => {
        setStatus('idle');
        setMessage('');
        setEmail('');
        setPassword('');
        setAttempts(0);
        setEmailTouched(false);
        Sentry.setUser(null);
    };

    const getMessageClasses = () => {
        switch (status) {
            case 'error':
                return 'bg-red-100 text-red-700';
            case 'locked':
                return 'bg-gray-100 text-gray-700 border border-gray-300';
            default:
                return '';
        }
    };

    if (status === 'success') {
        return (
            <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-200 text-center animate-in fade-in duration-300">
                <div className="mb-6 bg-green-100 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2 text-gray-800">Welcome Back!</h2>
                <p className="text-gray-600 mb-6">{email}</p>

                <button
                    onClick={handleLogout}
                    className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                >
                    Logout
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login Demo</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => setEmailTouched(true)}
                        disabled={status === 'locked'}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${emailTouched && !isEmailValid ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} disabled:bg-gray-100 disabled:text-gray-500`}
                        placeholder="demo@example.com"
                    />
                </div>

                <div>
                    <span className="block text-sm font-medium text-gray-700 mb-1" id="password-label">
                        Password
                    </span>
                    <div>
                        <PasswordInput
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            showRequirements={true}
                            disabled={status === 'locked'}
                        />
                    </div>
                </div>

                {message && (
                    <div className={`p-3 rounded-md text-sm ${getMessageClasses()}`}>
                        {message}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={!isFormValid}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                    {status === 'locked' ? 'Locked' : 'Login'}
                </button>
            </form>

            <div className="mt-4 text-xs text-gray-500 text-center">
                <p>Use <strong>demo@example.com</strong> for successful login.</p>
                <p>Password must meet all requirements.</p>
            </div>
        </div>
    );
};
