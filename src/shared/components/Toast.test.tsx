import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Toast } from './Toast';

describe('Toast', () => {
    it('renders the notification message', () => {
        const message = 'Operation successful';
        render(<Toast message={message} onClose={vi.fn()} variant="success" />);

        const alert = screen.getByRole('alert');
        expect(alert).toBeInTheDocument();
        expect(alert).toHaveTextContent(message);
    });

    it('applies success styling correctly', () => {
        render(<Toast message="Success" onClose={vi.fn()} variant="success" />);
        const alert = screen.getByRole('alert');
        expect(alert).toHaveClass('bg-green-100', 'text-green-800', 'border-green-200');
    });

    it('applies error styling correctly', () => {
        render(<Toast message="Error" onClose={vi.fn()} variant="error" />);
        const alert = screen.getByRole('alert');
        expect(alert).toHaveClass('bg-red-100', 'text-red-800', 'border-red-200');
    });

    it('applies info styling correctly', () => {
        render(<Toast message="Info" onClose={vi.fn()} variant="info" />);
        const alert = screen.getByRole('alert');
        expect(alert).toHaveClass('bg-blue-100', 'text-blue-800', 'border-blue-200');
    });

    it('calls onClose when close button is clicked', () => {
        const onClose = vi.fn();
        render(<Toast message="Close me" onClose={onClose} variant="info" />);

        const closeButton = screen.getByLabelText(/close/i);
        fireEvent.click(closeButton);

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('auto-closes after 3 seconds', () => {
        vi.useFakeTimers();
        const onClose = vi.fn();

        render(<Toast message="Auto close" onClose={onClose} variant="info" />);

        expect(onClose).not.toHaveBeenCalled();

        // Fast-forward time
        act(() => {
            vi.advanceTimersByTime(3000);
        });

        expect(onClose).toHaveBeenCalledTimes(1);
        vi.useRealTimers();
    });

    it('clears timer on unmount to prevent memory leaks', () => {
        vi.useFakeTimers();
        const onClose = vi.fn();

        const { unmount } = render(<Toast message="Unmount test" onClose={onClose} variant="info" />);

        unmount();

        // Fast-forward time after unmount
        act(() => {
            vi.advanceTimersByTime(3000);
        });

        expect(onClose).not.toHaveBeenCalled();
        vi.useRealTimers();
    });
});
