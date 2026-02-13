import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { LoginDemo } from './LoginDemo';

describe('LoginDemo', () => {
    it('renders email and password inputs', () => {
        render(<LoginDemo />);

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('submit button is disabled when form is invalid', async () => {
        const user = userEvent.setup();
        render(<LoginDemo />);

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const submitButton = screen.getByRole('button', { name: /login/i });

        // Initially disabled (empty)
        expect(submitButton).toBeDisabled();

        // Invalid email
        await user.type(emailInput, 'invalid-email');
        await user.type(passwordInput, 'ValidPass123!');
        expect(submitButton).toBeDisabled();

        // Clear email
        await user.clear(emailInput);

        // Invalid password (too short)
        await user.type(emailInput, 'test@example.com');
        await user.clear(passwordInput);
        await user.type(passwordInput, 'short');
        expect(submitButton).toBeDisabled();
    });

    it('submit button is enabled when form is valid', async () => {
        const user = userEvent.setup();
        render(<LoginDemo />);

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const submitButton = screen.getByRole('button', { name: /login/i });

        await user.type(emailInput, 'test@example.com');
        await user.type(passwordInput, 'ValidPass123!');

        expect(submitButton).toBeEnabled();
    });

    it('shows success message with demo credentials', async () => {
        const user = userEvent.setup();
        render(<LoginDemo />);

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const submitButton = screen.getByRole('button', { name: /login/i });

        await user.type(emailInput, 'demo@example.com');
        await user.type(passwordInput, 'ValidPass123!');
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
        });
    });

    it('shows error message with invalid credentials', async () => {
        const user = userEvent.setup();
        render(<LoginDemo />);

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const submitButton = screen.getByRole('button', { name: /login/i });

        await user.type(emailInput, 'wrong@example.com');
        await user.type(passwordInput, 'ValidPass123!');
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
        });
    });

    it('locks the form after 3 failed attempts', async () => {
        const user = userEvent.setup();
        render(<LoginDemo />);

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const submitButton = screen.getByRole('button', { name: /login/i });

        // Attempt 1
        await user.type(emailInput, 'wrong@example.com');
        await user.type(passwordInput, 'ValidPass123!');
        await user.click(submitButton);
        await waitFor(() => expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument());

        // Attempt 2
        await user.clear(emailInput);
        await user.clear(passwordInput);
        await user.type(emailInput, 'wrong@example.com');
        await user.type(passwordInput, 'ValidPass123!');
        await user.click(submitButton);
        await waitFor(() => expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument());
        // Note: The message might stay or re-appear. We just need to ensure we can click again.

        // Attempt 3
        await user.clear(emailInput);
        await user.clear(passwordInput);
        await user.type(emailInput, 'wrong@example.com');
        await user.type(passwordInput, 'ValidPass123!');
        await user.click(submitButton);

        // After 3rd attempt, form should be locked
        await waitFor(() => {
            expect(screen.getByText(/form locked due to too many failed attempts/i)).toBeInTheDocument();
        });

        expect(emailInput).toBeDisabled();
        expect(passwordInput).toBeDisabled();
        expect(submitButton).toBeDisabled();
    });
});
