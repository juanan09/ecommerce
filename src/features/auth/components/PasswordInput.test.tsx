import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { PasswordInput } from './PasswordInput';

describe('PasswordInput', () => {
    it('renders the password input with correct aria-label', () => {
        render(<PasswordInput value="" onChange={() => { }} showRequirements={false} />);

        const input = screen.getByLabelText('Password');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'password');
    });

    it('calls onChange when the user types', async () => {
        const handleChange = vi.fn();
        const user = userEvent.setup();

        render(<PasswordInput value="" onChange={handleChange} showRequirements={false} />);

        const input = screen.getByLabelText('Password');
        await user.type(input, 'a');

        expect(handleChange).toHaveBeenCalled();
    });

    it('toggles password visibility', async () => {
        const user = userEvent.setup();
        render(<PasswordInput value="secret" onChange={() => { }} showRequirements={false} />);

        const input = screen.getByLabelText('Password');
        expect(input).toHaveAttribute('type', 'password');

        // Find toggle button - explicit requirement: NO "password" in aria-label
        // So we might look for something like 'Show password' or 'Hide password' icon/button
        // Using a generic role query or specific aria-label that doesn't conflict with the input
        const toggleButton = screen.getByRole('button', { name: /show/i });
        await user.click(toggleButton);

        expect(input).toHaveAttribute('type', 'text');

        const hideButton = screen.getByRole('button', { name: /hide/i });
        await user.click(hideButton);

        expect(input).toHaveAttribute('type', 'password');
    });

    it('shows requirements list when showRequirements is true', () => {
        render(<PasswordInput value="" onChange={() => { }} showRequirements={true} />);

        // Expect to see some requirement text. Since the component handles requirements,
        // we might expect to see the specific text from our previous conversation or generic requirements.
        // Based on the user prompt: "Opción de mostrar lista de requisitos en tiempo real"
        // and "Muestra los requisitos cuando showRequirements es true"
        expect(screen.getByText(/12 characters/i)).toBeInTheDocument();
        expect(screen.getByText(/uppercase/i)).toBeInTheDocument();
        expect(screen.getByText(/lowercase/i)).toBeInTheDocument();
        expect(screen.getByText(/number/i)).toBeInTheDocument();
        expect(screen.getByText(/special/i)).toBeInTheDocument();
    });

    it('does not show requirements list when showRequirements is false', () => {
        render(<PasswordInput value="" onChange={() => { }} showRequirements={false} />);

        expect(screen.queryByText(/12 characters/i)).not.toBeInTheDocument();
    });

    it('displays the strength indicator', () => {
        const { rerender } = render(<PasswordInput value="" onChange={() => { }} showRequirements={true} />);

        // Check for strength indicator existence.
        // Implementation might use text or aria-label for the strength bar
        // We can check for the container or text "Strength: weak" etc.
        // Or look for an element with role "progressbar" or specific test id if we prefer.
        // Let's assume there is some visual indication.
        // Ideally we'd look for text like 'Weak', 'Medium', 'Strong' or an element representing it.
        // User request: "Barra de fortaleza visual (weak/medium/strong con colores)"

        expect(screen.getByText(/weak/i)).toBeInTheDocument();

        // Valid but short
        rerender(<PasswordInput value="ValidPass123!" onChange={() => { }} showRequirements={true} />);
        expect(screen.getByText(/medium/i)).toBeInTheDocument();

        // Strong
        rerender(<PasswordInput value="VeryLongValidPassword123!" onChange={() => { }} showRequirements={true} />);
        expect(screen.getByText(/strong/i)).toBeInTheDocument();
    });

    it('toggle button does not have "password" in aria-label', () => {
        render(<PasswordInput value="" onChange={() => { }} showRequirements={false} />);

        const toggleButton = screen.getByRole('button');
        const ariaLabel = toggleButton.getAttribute('aria-label') || '';

        // Requirement: "El botón de toggle NO debe incluir 'password' en su aria-label"
        expect(ariaLabel.toLowerCase()).not.toContain('password');
    });
});
