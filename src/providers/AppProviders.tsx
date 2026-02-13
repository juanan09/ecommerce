import type { ReactNode } from 'react';
import { CartProvider } from '../context/CartContext';
import { ToastProvider } from '../context/ToastContext';
import { SentryErrorBoundary } from '../infrastructure/SentryErrorBoundary';

interface AppProvidersProps {
    children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
    return (
        <SentryErrorBoundary>
            <ToastProvider>
                <CartProvider>
                    {children}
                </CartProvider>
            </ToastProvider>
        </SentryErrorBoundary>
    );
};
