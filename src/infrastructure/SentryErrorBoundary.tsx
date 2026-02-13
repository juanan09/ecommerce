import * as Sentry from '@sentry/react'
import React from 'react'

interface Props {
    children: React.ReactNode
}

interface FallbackProps {
    error: unknown
    resetError: () => void
}

const ErrorFallback = ({ error, resetError }: FallbackProps) => (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center bg-gray-50 rounded-lg border border-gray-200 shadow-sm animate-in fade-in duration-500">
        <div className="bg-red-100 p-4 rounded-full mb-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
            </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
        <p className="text-gray-600 mb-6 max-w-md">
            We've been notified about this issue and are working to fix it.
        </p>

        {import.meta.env.DEV && !!error && (
            <div className="w-full max-w-lg mb-6 p-4 bg-red-50 text-red-800 text-left rounded-md overflow-auto text-xs font-mono border border-red-200">
                <p className="font-bold mb-1">{(error as Error)?.name || 'Error'}</p>
                {(error as Error)?.message || JSON.stringify(error)}
            </div>
        )}

        <button
            onClick={resetError}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
            Try Again
        </button>
    </div>
)

export const SentryErrorBoundary: React.FC<Props> = ({ children }) => {
    return (
        <Sentry.ErrorBoundary
            fallback={ErrorFallback}
        >
            {children}
        </Sentry.ErrorBoundary>
    )
}
