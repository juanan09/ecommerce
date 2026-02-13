
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToastProvider, useToast } from './ToastContext';
import { describe, it, expect, vi } from 'vitest';

// Mock Toast component to isolate context logic and avoid testing Toast internal behavior
vi.mock('../shared/components/Toast', () => ({
    Toast: ({ message, onClose }: { message: string, onClose: () => void }) => (
        <div data-testid="toast">
            <span>{message}</span>
            <button onClick={onClose} aria-label="Close toast">Close</button>
        </div>
    ),
}));

const TestComponent = () => {
    const { addToast } = useToast();
    return (
        <div>
            <button onClick={() => addToast('Test Message', 'success')}>
                Show Toast
            </button>
            <button onClick={() => addToast('Info Message')}>
                Show Info
            </button>
        </div>
    );
};

describe('ToastContext', () => {
    it('throws error when used outside provider', () => {
        // Suppress console.error for expected error behavior in React render
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

        expect(() => render(<TestComponent />)).toThrow(/useToast must be used within a ToastProvider/i);

        consoleSpy.mockRestore();
    });

    it('renders children and adds toast', async () => {
        const user = userEvent.setup();
        render(
            <ToastProvider>
                <TestComponent />
            </ToastProvider>
        );

        expect(screen.queryByTestId('toast')).not.toBeInTheDocument();

        await user.click(screen.getByText('Show Toast'));

        expect(screen.getByTestId('toast')).toBeInTheDocument();
        expect(screen.getByText('Test Message')).toBeInTheDocument();
    });

    it('adds toast with default variant', async () => {
        const user = userEvent.setup();
        render(
            <ToastProvider>
                <TestComponent />
            </ToastProvider>
        );

        await user.click(screen.getByText('Show Info'));
        expect(screen.getByTestId('toast')).toBeInTheDocument();
    });

    it('removes toast when closed', async () => {
        const user = userEvent.setup();
        render(
            <ToastProvider>
                <TestComponent />
            </ToastProvider>
        );

        await user.click(screen.getByText('Show Toast'));
        const toast = screen.getByTestId('toast');
        expect(toast).toBeInTheDocument();

        const closeButton = screen.getByLabelText('Close toast');
        await user.click(closeButton);

        expect(screen.queryByTestId('toast')).not.toBeInTheDocument();
    });
});
