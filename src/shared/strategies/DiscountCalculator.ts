import type { DiscountStrategy } from './DiscountStrategy';
import type { CartItem } from '@/shared/types';

interface DiscountBreakdown {
    name: string;
    amount: number;
}

export class DiscountCalculator {
    private readonly strategies: DiscountStrategy[] = [];
    private breakdown: DiscountBreakdown[] = [];

    public registerStrategy(strategy: DiscountStrategy): void {
        this.strategies.push(strategy);
    }

    public calculate(items: CartItem[], subtotal: number): number {
        this.breakdown = [];
        let currentSubtotal = subtotal;
        let totalDiscount = 0;

        for (const strategy of this.strategies) {
            if (strategy.isApplicable(items, currentSubtotal)) {
                const discountAmount = strategy.calculate(items, currentSubtotal);

                if (discountAmount > 0) {
                    this.breakdown.push({
                        name: strategy.name,
                        amount: discountAmount
                    });

                    totalDiscount += discountAmount;
                    currentSubtotal -= discountAmount; // Apply sequentially to the remaining amount
                }
            }
        }

        return totalDiscount;
    }

    public getBreakdown(): DiscountBreakdown[] {
        return this.breakdown;
    }
}
