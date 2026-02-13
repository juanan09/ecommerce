
import { render } from '@testing-library/react';
import { ProductCardSkeleton } from './ProductCardSkeleton';

describe('ProductCardSkeleton', () => {
    it('renders without crashing', () => {
        const { container } = render(<ProductCardSkeleton />);
        expect(container).toBeInTheDocument();
        // Verify structure roughly
        expect(container.getElementsByClassName('animate-pulse').length).toBeGreaterThan(0);
    });
});
