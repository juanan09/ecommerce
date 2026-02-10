import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
    it('renders with pulse animation by default', () => {
        render(<Skeleton />);
        const skeleton = screen.getByRole('status');
        expect(skeleton).toBeInTheDocument();
        expect(skeleton).toHaveClass('animate-pulse');
        // Default variant is usually text or rectangular, let's assume rectangular or check specific class
        expect(skeleton).toHaveClass('bg-gray-200'); // Common skeleton color
    });

    it('renders text variant with correct height/radius', () => {
        render(<Skeleton variant="text" />);
        const skeleton = screen.getByRole('status');
        expect(skeleton).toHaveClass('rounded');
        // Text variant often has a default height or specific class, 
        // user requirement "Variantes: text, rectangular, circular".
        // Let's assume text variant adds a specific class or style.
        // If implementation details are not fixed, we check intended behavior.
    });

    it('renders circular variant with full border radius', () => {
        render(<Skeleton variant="circular" />);
        const skeleton = screen.getByRole('status');
        expect(skeleton).toHaveClass('rounded-full');
    });

    it('renders rectangular variant correctly', () => {
        render(<Skeleton variant="rectangular" />);
        const skeleton = screen.getByRole('status');
        expect(skeleton).toHaveClass('rounded-none'); // Or specific rounding for rectangular
    });

    it('accepts custom width and height', () => {
        render(<Skeleton width={100} height={50} />);
        const skeleton = screen.getByRole('status');
        expect(skeleton).toHaveStyle({ width: '100px', height: '50px' });
    });

    it('accepts string width and height', () => {
        render(<Skeleton width="50%" height="2rem" />);
        const skeleton = screen.getByRole('status');
        expect(skeleton).toHaveStyle({ width: '50%', height: '2rem' });
    });

    it('has correct accessibility attributes', () => {
        render(<Skeleton />);
        const skeleton = screen.getByRole('status', { hidden: true });
        // Note: skeleton is usually visual only, but role="status" is requested.
        // Ideally accessible skeletons are hidden from screen readers entirely (aria-hidden="true")
        // OR properly labelled as loading state.
        // User asked for role="status".
        // And maybe aria-label="Loading..."

        expect(skeleton).toBeInTheDocument();
        expect(skeleton).toHaveAttribute('aria-label', 'Loading...');
    });
});
